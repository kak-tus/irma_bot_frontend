FROM node:16.13.1-buster as build-stage

WORKDIR /app

COPY yarn.lock .
COPY package.json .

RUN yarn

COPY public ./public
COPY src ./src
COPY babel.config.js .
COPY tsconfig.json .

RUN yarn build

FROM nginx:1.19.6-alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
