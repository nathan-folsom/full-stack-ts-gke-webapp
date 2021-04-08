FROM node:12.18.0
ENV PORT=8080
WORKDIR /app

COPY package.json ./
COPY ./web-ui/package.json ./web-ui/
COPY ./server/package.json ./server/

RUN npm run install:web-ui
RUN npm run install:server

COPY . .

RUN cd server && npx prisma generate

EXPOSE 8080
EXPOSE 4200

#RUN npm run build:web-ui
#RUN npm run build:server

CMD ["npm", "run", "start"]