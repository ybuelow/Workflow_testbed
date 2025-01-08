FROM node:latest

WORKDIR /opt/didok

COPY . .

RUN npm install --production

CMD ["node", "./index.js"]

USER yanis