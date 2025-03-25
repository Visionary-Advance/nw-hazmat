# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy config and package files first (takes advantage of Docker caching)
COPY package.json package-lock.json ./
COPY tailwind.config.mjs postcss.config.mjs next.config.mjs jsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app (pages, components, public, styles, etc.)
COPY public/ public/
COPY app/ app/
COPY Components/ Components/

# Optional: if you have global styles in a styles folder
# COPY styles/ styles/

# Build the app (Tailwind will get processed here)
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

