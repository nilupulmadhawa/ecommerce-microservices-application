FROM node:alpine

WORKDIR /app/order_service
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8003

CMD ["npm", "start"]