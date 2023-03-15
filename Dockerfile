FROM node:latest
RUN mkdir /app
COPY ./ /app/
WORKDIR /app
RUN npm i
ENTRYPOINT ["node", "index.js"]
