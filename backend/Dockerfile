# ==============================================================================
# SnapBrand Backend Microservice Dockerfile
# Hadolint Compliant: Multi-stage, pinned minimal base, non-root system user
# ==============================================================================

# Stage 1: Build & compilation
FROM node:20.12.2-alpine3.19 AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src/
RUN npm run build

# Stage 2: Hardened, minimal production runtime
FROM node:20.12.2-alpine3.19 AS runner
WORKDIR /app

# DevSecOps: Security hardening & unprivileged non-root user creation
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy compiled artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Apply least-privilege ownership
USER 10001:10001

EXPOSE 5000

ENV NODE_ENV=production \
    PORT=5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "dist/server.js"]
