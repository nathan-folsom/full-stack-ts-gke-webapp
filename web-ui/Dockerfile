FROM node:12.18.0
WORKDIR /app/web-ui

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4200
