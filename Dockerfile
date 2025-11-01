FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

# expose the youtube api key, so we can use it in the frontend
ARG VITE_YOUTUBE_API_KEY
ENV VITE_YOUTUBE_API_KEY=${VITE_YOUTUBE_API_KEY}

COPY . .
RUN npm run build

# Install a static server
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]