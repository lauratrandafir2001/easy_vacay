FROM node:18.18.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm audit fix --force

COPY . .

EXPOSE 6000

CMD ["npm", "start"]