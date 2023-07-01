FROM node:18.16.1-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
ENV PORT 3000
ENV NODE_ENV development

CMD ["yarn", "dev"]