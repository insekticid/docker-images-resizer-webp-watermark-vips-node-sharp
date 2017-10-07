FROM node:8-alpine

RUN apk add --no-cache git graphicsmagick

COPY gulpfile.js /var/data/
COPY package.json /var/data/

RUN mkdir -p /var/data/ /var/data/generated/ /var/data/original/

RUN yarn global add gulp

WORKDIR /var/data

RUN yarn install

CMD ["gulp"]