# Produktion: statische Website hinter Caddy. Build-Kontext: Repo-Wurzel.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Werte für den Browser (leer = Buchungs-Widget zeigt die Mail-Anfrage)
ARG PUBLIC_TRIZOUN_API_URL=
ARG PUBLIC_TRIZOUN_KEY=
ENV PUBLIC_TRIZOUN_API_URL=$PUBLIC_TRIZOUN_API_URL PUBLIC_TRIZOUN_KEY=$PUBLIC_TRIZOUN_KEY
RUN npm run build && npm run seo-check

FROM caddy:2-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
