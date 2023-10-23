#STAGE 1 (BUILD)
FROM node:16.14.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build


#STAGE 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir /etc/nginx/ssl
COPY --from=build /usr/src/app/dist/client /usr/share/nginx/html