FROM node:20-bullseye

WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm

COPY . .

WORKDIR /app/frontend
RUN pnpm install --filter ./frontend...

EXPOSE 1027
CMD ["npm", "run", "dev"]

