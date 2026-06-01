FROM node:20-alpine

WORKDIR /usr/src/app

# Install only production dependencies for a smaller image
COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 3000
ENV PORT=3000

CMD ["node", "app.js"]
