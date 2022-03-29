FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./

COPY webpack.config.js ./

COPY tsconfig.json ./

RUN npm install

COPY src src

RUN npm run build:prod

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
