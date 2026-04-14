FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY backend/package.json backend/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
COPY packages/indicator-engine/package.json packages/indicator-engine/package.json
COPY packages/strategy-engine/package.json packages/strategy-engine/package.json
COPY packages/utils/package.json packages/utils/package.json
RUN npm install
COPY . .
RUN npm run build -w packages/shared-types && npm run build -w packages/indicator-engine && npm run build -w packages/strategy-engine && npm run build -w backend
EXPOSE 3000
CMD ["npm","run","start","-w","backend"]
