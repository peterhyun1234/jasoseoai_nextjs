# jasoseoai_nextjs
A service that automatically creates "jasoseo" or helps correction

### Required
- node version: v16.14.2(lts) 
- npm version: 8.5.0
- nginx version: nginx/1.18.0 (Ubuntu)

### Directory 설명
- /conf
  - conf 파일 저장 용도
- /build(not in remote repo)
  - 빌드 파일 저장 용도
- /public
  - /build를 구성하기 위한 껍데기 용도
- /src
  - 서비스를 구성하는 코드 및 리소스 저장 용도
- /var
  - 로그같은 가변적인 파일 보관 용도

## 배포 방법 (추후 배포 이후 단계랑 같이 docs/로 이관예정)
### 개발
  - local 환경에서 테스트용 배포
```bash
# 위 "Required" 확인 (nginx 확인은 필요없음)
node -v # should be v16.14.2
npm -v # should be 8.5.0

# jasoseoai_nextjs 로컬로 불러서 실행
git clone https://github.com/PortValue/jasoseoai_nextjs.git
cd jasoseoai_nextjs && npm i
npm run validation:init
npm run validation
npm start
```
- 데모 확인
  - https://localhost:9090/

### BETA (미정)
  - (**주의!!!!! 모든 과정 제대로 이해한 상태에서 해야함**)
  - pvconnect로 dev instance 접속
```bash
cd /home/ubuntu/release/jasoseoai_nextjs && git checkout release && git branch && git stash list

git fetch origin `branch list`	# origin 의 branch 를 fetch
git difftool main $branch1	# 변경 diff 확인
git merge $branch1 $branch2 ...	# 변경할 브랜치를 merge

# 코드변경 한번 더 확인
git diff main release --stat
git difftool main release

# 코드 변경 상태 모든 커밋된 상태인지 한번 더 확인
git status

# 필요에 따라 package 설치
npm install
npm run validation

# BETA용 빌드 및 BETA 장비 배포
npm run build:dev

# nginx 갱신(conf/ 변경시에만)
npm run nginx:cp_conf
npm run nginx:restart
```
- BETA 데모 확인
  - https://beta.jasoseoai.com/

### RC (미정)
  - (**주의!!!!! 모든 과정 제대로 이해한 상태에서 해야함**)
  - pvconnect로 dev instance 접속
```bash
cd /home/ubuntu/release/jasoseoai_nextjs && git checkout release && git branch && git stash list

git fetch origin `branch list`	# origin 의 branch 를 fetch
git difftool main $branch1	# 변경 diff 확인
git merge $branch1 $branch2 ...	# 변경할 브랜치를 merge

# 코드변경 한번 더 확인
git diff main release --stat
git difftool main release

# 코드 변경 상태 모든 커밋된 상태인지 한번 더 확인
git status

# 필요에 따라 package 설치
npm install
npm run validation

# RC용 빌드 및 RC 장비 배포
npm run build

# nginx 갱신(conf/ 변경시에만)
npm run nginx:cp_conf
npm run nginx:restart
```
- RC 데모 확인
  - https://rc.jasoseoai.com/
### RELEASE (미정)
  - (**주의!!!!! 모든 과정 제대로 이해한 상태에서 해야함**)
  - (**주의!!!!! 모든 과정 제대로 이해한 상태에서 해야함**)
  - (**주의!!!!! 모든 과정 제대로 이해한 상태에서 해야함**)
  - pvconnect로 fe instance 접속
```bash
cd /home/ubuntu/release/jasoseoai_nextjs && git checkout release && git branch && git stash list

git fetch origin `branch list`	# origin 의 branch 를 fetch
git difftool main $branch1	# 변경 diff 확인
git merge $branch1 $branch2 ...	# 변경할 브랜치를 merge

# 코드변경 한번 더 확인
git diff main release --stat
git difftool main release

# 코드 변경 상태 모든 커밋된 상태인지 한번 더 확인
git status

# 필요에 따라 package 설치
npm install
npm run validation

# RELEASE용 빌드 및 RELEASE 장비 배포
npm run build

# nginx 갱신(conf/ 변경시에만)
npm run nginx:cp_conf
npm run nginx:restart
```
- RELEASE 데모 확인
  - https://www.jasoseoai.com/
