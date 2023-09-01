FROM node:18.12.1-alpine

WORKDIR /core

COPY package*.json ./
COPY . .

RUN npm install

RUN npm build

EXPOSE 8000

CMD ["npm", "start"]
