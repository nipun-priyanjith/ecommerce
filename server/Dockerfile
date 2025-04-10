# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install 

# Copy the rest of the application
COPY . .

# Expose API port
EXPOSE 5000

# Start the Express server
CMD ["npm", "start"]
