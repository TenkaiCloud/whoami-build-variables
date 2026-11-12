FROM node:24-alpine

LABEL org.opencontainers.image.source="https://github.com/TenkaiCloud/whoami-build-variables"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --chown=node:node index.js build.js ./

# A plain build variable is a build argument, a sensitive one a secret that stays out of the image.
ARG PUBLIC_GREETING
RUN --mount=type=secret,id=BUILD_TOKEN npm run build

ENV HOST=0.0.0.0 \
    PORT=8080 \
    FIXTURE_ID=whoami-build-variables
EXPOSE 8080

USER node
CMD ["npm", "start"]
