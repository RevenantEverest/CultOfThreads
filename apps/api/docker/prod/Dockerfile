FROM oven/bun:1-alpine AS base

ARG GIT_COMMIT_SHA
ARG BUILD_TIME
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
ENV BUILD_TIME=$BUILD_TIME

# 1. Prune the monorepo to just what api needs
FROM base AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune api --docker

# 2. Install deps
FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile
COPY --from=pruner /app/out/full/ .

# 3. Build internal package dependencies
FROM installer AS builder
WORKDIR /app
RUN bun add -g turbo
RUN turbo build --filter=api^...

# 4. Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S expressjs && adduser -S expressjs -G expressjs
COPY --from=builder --chown=expressjs:expressjs /app .
USER expressjs
EXPOSE 3001
CMD ["bun", "run", "apps/api/src/server.ts"]