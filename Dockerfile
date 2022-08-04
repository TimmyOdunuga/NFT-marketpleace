# syntax = docker/dockerfile:1.3
FROM node:14-buster-slim

WORKDIR /usr/src/app

RUN mkdir ./client
RUN mkdir ./client/src
RUN mkdir ./client/public
RUN mkdir ./server
RUN mkdir ./server/src
RUN mkdir ./server/public

RUN --mount=type=secret,id=env \
  cp /run/secrets/env /usr/src/app/server/.env

RUN cp /usr/src/app/server/.env /usr/src/app/client/.env

RUN cat /usr/src/app/server/.env
RUN cat /usr/src/app/client/.env

RUN apt-get update -y \
  && apt-get upgrade -y

RUN apt-get install -y git

RUN umask 0 && npm config set cache /tmp/.npm

COPY client/package*.json ./client/
COPY client/src ./client/src
COPY client/public ./client/public
RUN npm --prefix ./client install
RUN npm --prefix ./client run build

COPY server/package*.json ./server/
COPY ecosystem.config.js ./
COPY server/index.js ./server
COPY server/src ./server/src
RUN npm --prefix ./server install

RUN cp -r ./client/build/* ./server/public
RUN rm -r client

RUN npm install pm2 -g

CMD [ "pm2-runtime", "ecosystem.config.js" ]

EXPOSE 5000
