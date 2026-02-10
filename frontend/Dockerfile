FROM node:20-bullseye
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-workspace.yaml ./
#COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json frontend/package.json
COPY packages packages
RUN pnpm install --filter ./frontend... 
COPY . .
WORKDIR /app/frontend
EXPOSE 1027
