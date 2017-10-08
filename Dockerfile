FROM node:latest

# Create app directory
WORKDIR /app
ADD . /app

# Install app dependencies
RUN npm install

EXPOSE 3000
CMD [ "node", "index.js" ]