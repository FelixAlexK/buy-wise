# syntax = docker/dockerfile:1

# Use Bun's official image
FROM oven/bun:1.2.0-slim as base

LABEL fly_launch_runtime="Bun"

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build (if any native dependencies)
RUN apt-get update -qq && \
    apt-get install -y python3 pkg-config build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY --link package.json bun.lockb* ./
COPY --link frontend/package.json ./frontend/
COPY --link backend/package.json ./backend/

# Install all dependencies (including devDependencies for build)
RUN bun install --frozen-lockfile

# Copy application code
COPY --link . .

# Build application
RUN bun run build

# Remove development dependencies
RUN bun install --frozen-lockfile --production

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["bun", "run", "start"]
