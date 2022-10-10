FROM node:14-alpine

WORKDIR /Node

COPY ./Node/package*.json ./
RUN npm ci

COPY ./Node ./
COPY ./Entities ../Entities
RUN npm run build

EXPOSE 4000

ENTRYPOINT ["npm", "start"]