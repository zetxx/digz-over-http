FROM node:latest
RUN mkdir /app
COPY ./ /app/
WORKDIR /app
ENTRYPOINT ["node", "index.js"]
