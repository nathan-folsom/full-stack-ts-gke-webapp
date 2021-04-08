FROM node:12.18.0
WORKDIR /app/server

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run generate
RUN npx prisma

EXPOSE 4000
