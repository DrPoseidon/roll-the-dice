FROM node:12
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 9000
CMD [ "node", "server.js" ]