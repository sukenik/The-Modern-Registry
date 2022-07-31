FROM node:14-alpine

WORKDIR /app

COPY ./Client/package*.json ./
RUN npm ci

COPY ./Client ./
COPY ./Entities ../Entities
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]