FROM node:20 

WORKDIR /app 

# Copiar solo package.json para cache 

COPY package*.json ./ 

RUN npm install --legacy-peer-deps

COPY . . 

EXPOSE 5173 

CMD ["npm", "run", "dev"]