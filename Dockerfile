FROM node:lts-slim
WORKDIR /agriness-desafio-nestjs
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT npm start
