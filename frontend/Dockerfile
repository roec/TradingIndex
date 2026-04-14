FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY frontend/package.json frontend/package.json
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm","run","dev","-w","frontend","--","--host","0.0.0.0"]
