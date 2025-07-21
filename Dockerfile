# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy server package.json
COPY apps/server/package.json ./

# Use npm instead of pnpm for Docker
RUN npm install --production

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy dependencies and server files
COPY --from=builder /app/node_modules ./node_modules
# COPY apps/server/server.js ./server.js
COPY apps/server/package.json ./package.json

EXPOSE 1234

ENV HOST=0.0.0.0
ENV PORT=1234

CMD ["npm", "start"]