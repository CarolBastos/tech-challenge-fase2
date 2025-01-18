FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps && npm install -g nodemon

COPY . .

EXPOSE 3003

CMD ["npm", "run", "dev"]
