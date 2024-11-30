# Stage 1: Build Stage
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Copy the entire project
COPY . .

# Build the React app
RUN yarn run build

# Stage 2: Serve Stage
FROM nginx:alpine

# Copy the build files to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
