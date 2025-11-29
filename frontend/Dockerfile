# build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ENV VITE_API_BASE_URL=/api
RUN npm run build

# production stage - nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# optional: custom nginx.conf to handle history API fallback for react-router
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]