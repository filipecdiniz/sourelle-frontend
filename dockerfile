FROM node:latest

WORKDIR /app

# Copiar os arquivos package.json e package-lock.json primeiro
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Rodar o build do Next.js
RUN npm run build

# Expor a porta
EXPOSE 8080

# Rodar o servidor Next.js
CMD ["npm", "start"]
