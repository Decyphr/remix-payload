# Builder image
FROM docker.io/node:16-alpine AS base

RUN apk update && apk add git
RUN apk add --no-cache libc6-compat

# Set up pnpm & turbo
RUN npm install -g pnpm
RUN npm install -g turbo
RUN pnpm config set store-dir .pnpm-store
RUN pnpm fetch

# Prune the workspace for the `frontend` app
FROM base as pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@org/server --docker

# Add pruned lockfile and package.json's of the pruned subworkspace
FROM base AS installer
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only the deps needed to build the target
RUN pnpm install

# Copy source code of pruned subworkspace and build
FROM base as builder
WORKDIR /app
COPY --from=pruner /app/.git ./.git
COPY --from=pruner /app/out/full/ .
COPY --from=installer /app/ .
COPY tsconfig.json .
RUN turbo run build --filter=@org/server


# Serve the app
FROM builder as runner

ENV PORT="8080"
ENV NODE_ENV="production"

CMD ["pnpm", "run", "serve"]