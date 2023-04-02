# 베이스 이미지 설정
FROM node:16.14.2-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 프로젝트 소스 복사
COPY . .

# 프로젝트 빌드
RUN npm run build

# PM2 설치
RUN npm install -g pm2

# 노출할 포트 설정
EXPOSE 4000

# PM2를 사용하여 애플리케이션 실행
CMD ["npm", "run", "pm2"]