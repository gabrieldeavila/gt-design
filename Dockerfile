# Use the official Node.js image as the base image
FROM node:latest

# Install the gzip package
RUN apk add --no-cache gzip

# Set the working directory to the project root
WORKDIR /app

# Copy the project files to the container
COPY . .

# Build the Storybook project
RUN npm install && npm run build-storybook

# Compress the assets using gzip
RUN find ./storybook-static -type f -name '*.js' -exec gzip -9 {} \; -exec mv {}.gz {} \;
RUN find ./storybook-static -type f -name '*.css' -exec gzip -9 {} \; -exec mv {}.gz {} \;

# Set the command to serve the Storybook project
CMD ["npm", "run", "storybook"]
