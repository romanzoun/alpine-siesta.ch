FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# .env.local liegt im Build-Kontext. Astro liest PUBLIC_-Werte hier; sie wird nicht committet.
# Server-Variablen (TRIZOUN_*) kommen zur Laufzeit aus der Umgebung / docker-compose.
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
