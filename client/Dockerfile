# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and lock file first (for caching)
COPY package*.json ./

# Install dependencies as root
RUN npm install --legacy-peer-deps

# Give full access to node_modules + react-scripts
RUN chmod +x node_modules/.bin/react-scripts

# Copy all other files
COPY . .

# Expose React app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
