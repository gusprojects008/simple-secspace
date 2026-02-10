FROM node:18-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml ./
#COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY packages packages
# The operator "..." indicates that pnpm should install all pending items from the backend package and all packages it depends on, recursively
RUN pnpm install --filter ./backend... 
COPY . .
WORKDIR /app/backend
EXPOSE 1026
