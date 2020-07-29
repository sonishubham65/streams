FROM node:latest
WORKDIR /usr/src/app
EXPOSE 3000
COPY package.json .
COPY . .
RUN npm install
CMD node app