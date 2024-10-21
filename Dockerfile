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
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
ENV PORT=3000

CMD ["server.js"]
