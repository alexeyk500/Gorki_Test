FROM node:14-alpine as builder
COPY package.json package-lock.json ./
RUN npm install && mkdir /client && mv ./node_modules ./client
WORKDIR /client
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /client/build /usr/share/nginx/html
EXPOSE 3000 80
CMD ["nginx", "-g", "daemon off;"]
