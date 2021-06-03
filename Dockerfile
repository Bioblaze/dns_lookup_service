# syntax=docker/dockerfile:1

FROM node:latest

RUN apt-get update
RUN apt-get -y install jq gawk dnsutils

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 41419
CMD [ "node", "index.js" ]