FROM node:9

COPY ./ /

WORKDIR /
RUN npm i pm2 -g --quiet
RUN npm i --quiet
RUN npm run build

EXPOSE 8080

CMD ["pm2-docker", "start", "server/pm2.config.json"]
