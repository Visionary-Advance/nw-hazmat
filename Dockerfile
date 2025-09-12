# ---- Builder ----
FROM node:18 AS builder
WORKDIR /app

# Reproducible installs
COPY package*.json ./
RUN npm ci

# App code
COPY . .

# Help DNS and silence telemetry
ENV NODE_OPTIONS=--dns-result-order=ipv4first
ENV NEXT_TELEMETRY_DISABLED=1

# Avoid SWC download flakiness + satisfy optimizeCss (Critters)
RUN npm i -D @next/swc-linux-x64-gnu@15.5.3 --no-save
RUN npm i -D critters --no-save

# Build (Node runtime; API routes supported)
RUN npm run build

# ---- Runner ----
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Install prod deps only
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Bring build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/jsconfig.json ./

# Start Next.js (API routes included)
CMD ["npx", "next", "start", "-p", "3000"]
