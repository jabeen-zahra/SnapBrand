# ==============================================================================
# SnapBrand Frontend SPA Dockerfile
# Hadolint Compliant: Multi-stage, minimal pinned base, unprivileged Nginx
# ==============================================================================

# Stage 1: Build compilation
FROM node:22-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Hardened unprivileged Nginx web server
FROM nginxinc/nginx-unprivileged:1.29-alpine

# Apply the latest Alpine security patches, then drop back to the unprivileged user
USER root
RUN apk upgrade --no-cache
USER 101:101

# Copy custom Nginx configuration
COPY --chown=101:101 default.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder --chown=101:101 /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["wget", "-q", "--spider", "http://127.0.0.1:8080/healthz"]

CMD ["nginx", "-g", "daemon off;"]