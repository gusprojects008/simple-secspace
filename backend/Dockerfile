FROM node:18-alpine

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm

COPY . .

ENV CI=true

RUN pnpm install --filter ./backend...

WORKDIR /app/backend

EXPOSE 1026

CMD ["pnpm", "run", "dev"]

