# ==============================================================================
# SnapBrand Frontend SPA Dockerfile
# Hadolint Compliant: Multi-stage, minimal pinned base, unprivileged Nginx
# ==============================================================================

# Stage 1: Build compilation
FROM node:20.12.2-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Hardened unprivileged Nginx web server
FROM nginxinc/nginx-unprivileged:1.25-alpine
USER 101:101

# Copy custom Nginx configuration
COPY --chown=101:101 default.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder --chown=101:101 /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]