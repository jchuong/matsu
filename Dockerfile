##### BASE

FROM --platform=linux/amd64 oven/bun:alpine AS base
WORKDIR /app

##### DEPS
FROM base AS deps
WORKDIR /app
COPY . .
RUN bun install


##### BUILDER

FROM deps AS builder

WORKDIR /app

ARG DATABASE_URL

# ENV NEXT_TELEMETRY_DISABLED 1

RUN SKIP_ENV_VALIDATION=1 bun run build

##### RUNNER

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy migrations
RUN bun install drizzle-orm
COPY --from=builder /app/drizzle-prod.config.ts ./drizzle.config.ts
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/migrate.ts ./

EXPOSE 3000
ENV PORT=3000

CMD ["sh", "-c", "bun run migrate.ts && bun --bun run server.js"]
