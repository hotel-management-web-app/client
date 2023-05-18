FROM node:18.15.0

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]