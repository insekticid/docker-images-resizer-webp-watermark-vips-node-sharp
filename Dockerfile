FROM node:8-alpine

MAINTAINER github-gulp-img-resize@exploit.cz

RUN apk add --update \
  --repository http://dl-3.alpinelinux.org/alpine/edge/testing \
  vips-dev fftw-dev libwebp \
  && rm -rf /var/cache/apk/*

RUN apk add --no-cache git graphicsmagick python g++ make

#ARG VIPS_VERSION=8.5.8
#RUN apk update \
#    && apk upgrade \
#    && apk add \
#    zlib libxml2 glib gobject-introspection \
#    libjpeg-turbo libexif lcms2 fftw giflib libpng \
#    libwebp orc tiff poppler-glib librsvg libgsf openexr \
#    && apk add --virtual vips-dependencies build-base wget \
#    zlib-dev libxml2-dev glib-dev gobject-introspection-dev \
#    libjpeg-turbo-dev libexif-dev lcms2-dev fftw-dev giflib-dev libpng-dev \
#    libwebp-dev orc-dev tiff-dev poppler-dev librsvg-dev libgsf-dev openexr-dev \
#    py-gobject3-dev \
#    && wget -O- https://github.com/jcupitt/libvips/releases/download/v${VIPS_VERSION}/vips-${VIPS_VERSION}.tar.gz | tar xzC /tmp \
#    && cd /tmp/vips-${VIPS_VERSION} \
#    && ./configure --prefix=/usr \
#                   --without-python \
#                   --disable-static \
#                   --disable-dependency-tracking \
#                   --enable-silent-rules \
#    && make -s install-strip \
#    && cd $OLDPWD \
#    && rm -rf /tmp/vips-${VIPS_VERSION} \
#    && apk del --purge vips-dependencies \
#    && rm -rf /var/cache/apk/*
#
COPY gulpfile.js /var/data/
COPY package.json /var/data/

RUN mkdir -p /var/data/ /var/data/generated/ /var/data/original/

RUN rm -rf node_modules && yarn global add gulp

WORKDIR /var/data

RUN yarn install && ls -al generated

CMD ["gulp"]