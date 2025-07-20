FROM node:22-alpine

# 安裝 git（Hexo 有些套件需要）
RUN apk add --no-cache git

WORKDIR /app

# 安裝 hexo-cli（全域）
RUN npm install -g hexo-cli

# 預設命令行（可被 docker-compose override）
CMD [ "sh" ]