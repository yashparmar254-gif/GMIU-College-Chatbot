FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json ./
RUN npm install --omit=dev --ignore-scripts
COPY server.js ./
COPY . .
COPY app.config.ts ./

EXPOSE 3000
CMD ["npm", "start"]
