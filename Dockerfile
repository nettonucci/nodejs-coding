FROM node:alpine

WORKDIR /src/server

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD yarn dev