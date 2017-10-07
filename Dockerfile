FROM node:alpine

COPY gulpfile.js /var/data/
COPY package.json /var/data/
COPY watermark.png /var/data/

RUN mkdir -p /var/data/ /var/data/generated/ /var/data/original/

RUN yarn global add gulp

WORKDIR /var/data

RUN yarn install

CMD ["gulp", "images:watch"]