FROM node AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx

COPY --from=build /app/build/ /var/www/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]