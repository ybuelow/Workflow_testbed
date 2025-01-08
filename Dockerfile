# Stage 1: Build Angular app
FROM node:18.13.0-alpine as build

WORKDIR /opt/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build --prod

FROM node:18.13.0-alpine as final

WORKDIR /opt/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm install

COPY backend/ ./

COPY --from=build /opt/frontend/dist /opt/backend/dist

EXPOSE 3001

ENV NODE_ENV=production

CMD ["npm", "start"]