# SnapBrand AWS Cloud Infrastructure & Networking Architecture

## Overview & Network Topology
SnapBrand is engineered for High Availability (HA) across two AWS Availability Zones (`us-east-1a` and `us-east-1b`) within a dedicated Virtual Private Cloud (VPC). The network is strictly segmented into public and private tiers to isolate compute instances from direct internet exposure.

---

## CIDR Allocations & Subnet Segmentation

| Subnet Identifier | Availability Zone | CIDR Block | Route Table Association | Target Resources |
|---|---|---|---|---|
| `Public-Subnet-1A` | `us-east-1a` | `10.0.1.0/24` | Internet Gateway (`igw-xxxx`) | Application Load Balancer, NAT Gateway 1A |
| `Public-Subnet-1B` | `us-east-1b` | `10.0.2.0/24` | Internet Gateway (`igw-xxxx`) | Application Load Balancer standby |
| `Private-Subnet-1A` | `us-east-1a` | `10.0.10.0/24` | NAT Gateway (`nat-xxxx`) | Auto Scaling EC2 Instance, PostgreSQL, Redis |
| `Private-Subnet-1B` | `us-east-1b` | `10.0.20.0/24` | NAT Gateway (`nat-xxxx`) | Auto Scaling EC2 Instance, Storage Replicas |

### Network Egress & NAT
* Inbound internet traffic enters solely through the Application Load Balancer across Public Subnets.
* Outbound egress from private EC2 instances (e.g. pulling base images from Amazon ECR or updating OS security packages) routes through the NAT Gateway.

---

## Security Group Rules (Least Privilege)

### 1. Application Load Balancer Security Group (`snapbrand-alb-sg`)
* **Inbound**:
  * HTTP (Port 80): `0.0.0.0/0` (Redirects to HTTPS in production)
  * HTTPS (Port 443): `0.0.0.0/0`
* **Outbound**:
  * TCP (Port 80 / 8080): Destination `snapbrand-ec2-sg`

### 2. Private EC2 Instance Security Group (`snapbrand-ec2-sg`)
* **Inbound**:
  * TCP (Port 80 / 5000): Source `snapbrand-alb-sg` **ONLY**. (All direct public traffic is dropped).
  * SSH (Port 22): **DISABLED**. Remote shell access is conducted via AWS Systems Manager (SSM) Session Manager.
* **Outbound**:
  * All Traffic (Port 0-65535): `0.0.0.0/0` (via NAT Gateway for ECR pulls and CloudWatch metric submission).

---

## Auto Scaling Group & Launch Template Configuration

* **Launch Template**:
  * Instance Type: `t3.micro` or `t3.small` (Cost-effective, Free-Tier eligible).
  * AMI: Hardened Amazon Linux 2023 or Ubuntu 22.04 LTS.
  * IAM Instance Profile: Role with `AmazonEC2ContainerRegistryReadOnly`, `CloudWatchAgentServerPolicy`, and `AmazonSSMManagedInstanceCore`.
  * User Data: Pulls and starts production Docker Compose stack automatically on boot.
* **Auto Scaling Group (ASG)**:
  * Minimum Capacity: 2 (1 per AZ for active-active redundancy).
  * Desired Capacity: 2.
  * Maximum Capacity: 6.
  * Health Check Type: `ELB` (180s grace period).
  * Target Tracking Scaling Policy: Target average CPU utilization at **60%**.

---

## Failure Recovery & Chaos Experiment Procedure
To verify fault tolerance:
1. Identify the active EC2 instance in `us-east-1a`.
2. Terminate the instance via AWS CLI or Console:
   ```bash
   aws ec2 terminate-instances --instance-ids <INSTANCE_ID>
   ```
3. Observe ALB health checks rerouting 100% of user traffic to the instance in `us-east-1b` with 0 dropped requests.
4. Auto Scaling Group detects unhealthy count and launches a replacement instance in `us-east-1a` within 90 seconds.
