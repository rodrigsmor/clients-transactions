FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5172

CMD [ "npm", "start", "--", "-p", "5172" ]