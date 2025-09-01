ARG NODE_VERSION=23.7.0

# ----------- builder from git ----------
FROM node:${NODE_VERSION}-slim as builder-from-git
WORKDIR /app

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

ARG GITHUB_TOKEN
RUN git clone https://$GITHUB_TOKEN@github.com/AnswerShy/Aniua.git .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_SEARCH_API_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_SEARCH_API_URL=$NEXT_PUBLIC_SEARCH_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

RUN npm ci
RUN npm run build
RUN cp -r public .next/standalone/
RUN cp -r .next/static .next/standalone/.next/

# ----------- run standalone next build ----------
FROM node:${NODE_VERSION}-slim as next-app-runner
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_SEARCH_API_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_SEARCH_API_URL=$NEXT_PUBLIC_SEARCH_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

COPY --from=builder-from-git /app/.next/standalone ./
COPY .env .env

RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "server.js"]