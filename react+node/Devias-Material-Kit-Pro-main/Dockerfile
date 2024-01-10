# FROM node:18-alpine as builder
# WORKDIR /my-space

# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn build

# FROM node:18-alpine as runner
# WORKDIR /my-space
# COPY --from=builder /my-space/package.json .
# COPY --from=builder /my-space/yarn.lock .
# COPY --from=builder /my-space/next.config.js ./
# COPY --from=builder /my-space/public ./public
# COPY --from=builder /my-space/.next/static ./.next/static
# EXPOSE 3000
# ENTRYPOINT ["yarn", "start"]
FROM node:20-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]