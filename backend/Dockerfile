# ==============================================================================
# SnapBrand Backend Microservice Dockerfile
# Hadolint Compliant: Multi-stage, pinned minimal base, non-root system user
# ==============================================================================

# Stage 1: Build & compilation
FROM node:22-alpine3.22 AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src/
RUN npm run build

# Stage 2: Hardened, minimal production runtime
FROM node:22-alpine3.22 AS runner
WORKDIR /app

# Apply the latest Alpine security patches
RUN apk upgrade --no-cache

# DevSecOps: Security hardening & unprivileged non-root user creation
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

COPY package*.json ./
# The runtime image does not need npm/yarn: remove them after installing production deps
RUN npm ci --omit=dev && npm cache clean --force && \
    rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /opt/yarn* /usr/local/bin/yarn*

# Copy compiled artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Writable data directory for the file-backed storage layer (mounted as a volume)
RUN mkdir -p /app/data && chown -R 10001:10001 /app/data

# Apply least-privilege ownership
USER 10001:10001

EXPOSE 5000

ENV NODE_ENV=production \
    PORT=5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["wget", "-q", "--spider", "http://localhost:5000/health"]

CMD ["node", "dist/server.js"]
