FROM node:current-alpine
RUN mkdir /app
COPY ./ /app/
WORKDIR /app
RUN npm i
ENTRYPOINT ["node", "index.js"]