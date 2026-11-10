# Produktion: Website mit serverseitigem Entdecken. Build-Kontext: Repo-Wurzel.
# Der vordere Caddy spricht den Container auf Port 80 an.
FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_TRIZOUN_API_URL=
ARG PUBLIC_TRIZOUN_KEY=
ENV PUBLIC_TRIZOUN_API_URL=$PUBLIC_TRIZOUN_API_URL PUBLIC_TRIZOUN_KEY=$PUBLIC_TRIZOUN_KEY
ENV HOST=0.0.0.0
ENV PORT=80
RUN npm run build && npm run seo-check
EXPOSE 80
CMD ["node", "./dist/server/entry.mjs"]
