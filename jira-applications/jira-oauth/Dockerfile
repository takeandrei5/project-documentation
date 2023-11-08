FROM node:18.16.1-alpine
RUN apk add --no-cache libc6-compat
EXPOSE 8000

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .

CMD ["yarn", "dev"]