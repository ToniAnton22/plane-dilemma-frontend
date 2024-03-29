# —- Build Stage —-
FROM node:latest AS builder

# Specify the working directory
WORKDIR /app

# Copy package.json and package-lock.json for utilising Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy local files to the app folder
COPY . .

# Build app
RUN npm run build

# —- Production Stage —-
FROM nginx:latest AS production

# Copy build folder from build stage to nginx
COPY –from=builder /app/public /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD [“nginx”, “-g”, “daemon off;”]