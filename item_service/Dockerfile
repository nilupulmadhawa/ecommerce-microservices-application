FROM node:alpine

WORKDIR /app/item_service
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8002

CMD ["npm", "start"]