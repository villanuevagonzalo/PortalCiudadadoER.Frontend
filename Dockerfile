FROM node:18.1-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Build command: docker build -t ciudadanodigital-frontend .
# Run command: docker run -d -p 3000:3000 --name ciudadanodigital-frontend --env-file ./.env ciudadanodigital-frontend
# Run command with bind mount (Windows): 
# docker run -d -p 3000:3000 --name ciudadanodigital-frontend --env-file ./.env -v %cd%/src:/app/src:ro -e CHOKIDAR_USEPOLLING=true ciudadanodigital-frontend
# Stop command: docker stop ciudadanodigital-frontend