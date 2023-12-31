![](https://bow-hair-db3.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F571a24a3-05f9-4ea5-b01f-cba1a3ac070d%2Fa864b64b-c5ad-4d82-b7bc-2bcabc892bbc%2Fhome.jpeg?table=block&id=1850bca2-6fda-4e0c-a141-0df270c03409&spaceId=571a24a3-05f9-4ea5-b01f-cba1a3ac070d&width=2000&userId=&cache=v2)

# 원티드 프리온보딩 백엔드 인턴십 사전 과제

![Node.js](https://img.shields.io/badge/Node.js-v19.2.0-DDDDDD?style=flat&logo=Node.js&logoColor=FFFFFF&labelColor=339933)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=Javascript&logoColor=FFFFFF)
![WebStorm](https://img.shields.io/badge/WebStorm-07B2F4?style=flat&logo=WebStorm&logoColor=FFFFFF)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=FFFFFFF)

## 개발 환경

- **언어 및 런타임 환경** : Typescript, Node.js
- **프레임워크** : NestJS
- **데이터베이스** : MySQL

## 데이터베이스 모델링

![모델링](./public/images/wanted_erd.png)

- **COMPANY** : 회사
- **USER** : 사용자
- **RECRUITMENT** : 채용공고
- **APPLICATIONS** : 지원내역

## 환경 설정 및 실행

- 데이터베이스 스키마는 `wanted`라는 이름으로 생성하였습니다.
  ```sql
  CREATE DATABASE `wanted`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  DEFAULT ENCRYPTION='N';
  ```
- 데이터베이스 환경은 /config/env/폴더에서 설정할 수 있습니다.
    ```dotenv
    HOST_PORT='서버 포트'
    DATABASE_HOST='데이터베이스 주소'
    DATABASE_PORT='데이터베이스 포트'
    DATABASE_USERNAME='계정 이름'
    DATABASE_PASSWORD='계정 비밀번호'
    DATABASE_NAME='데이터베이스 이름'
    ```
- `start.sh` 또는 `start.bat`를 통해 **데이터베이스 테이블을 구성**하고 회사(Company), 사용자(User) **임의 데이터를 생성**한 뒤 **어플리케이션을 실행**합니다.
  ```shell
  # 리눅스 사용자일 경우
  sh start.sh
  ```
    ```shell
  # 윈도우 사용자일 경우
  ./start.bat
  ```

## :memo: API 명세

> [`GitHub Wiki`로 이동! 🏃🏻‍💨](https://github.com/laetipark/wanted-pre-onboarding-backend/wiki/REST-API)
