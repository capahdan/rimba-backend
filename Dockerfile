# Use the official Node.js image as the base
FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the necessary port(s)
EXPOSE 8080

# Define the startup command
CMD ["node", "server.js"]
