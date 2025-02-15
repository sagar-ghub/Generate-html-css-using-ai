# Stage 1: Build
FROM node:18-buster AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm i

# Copy all source files and build the app
COPY . .
RUN npm run build

# Use an official Node.js runtime as the base image
FROM node:18-buster AS runner

# Install Python and build tools
# RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm i --only=production

# Copy the built app and public assets from the builder stage
# (Assuming you have a multi-stage build; adjust as needed)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Run the Next.js server as non-root (optional but recommended)
USER node

CMD ["npm", "start"]
