![](https://bow-hair-db3.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F571a24a3-05f9-4ea5-b01f-cba1a3ac070d%2Fa864b64b-c5ad-4d82-b7bc-2bcabc892bbc%2Fhome.jpeg?table=block&id=1850bca2-6fda-4e0c-a141-0df270c03409&spaceId=571a24a3-05f9-4ea5-b01f-cba1a3ac070d&width=2000&userId=&cache=v2)

# 원티드 프리온보딩 백엔드 인턴십 사전 과제

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

## API

### 1. 채용공고를 등록합니다.

`POST /recruitment/`

#### Request(Body)

```json
{
  "companyID": 1,
  "position": "백엔드 주니어 개발자",
  "reward": 1000000,
  "content": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "skill": "Python"
}
```

#### Response(201)

```json
{
  "message": "정상적으로 채용 공고를 등록하였습니다.",
  "data": {
    "companyID": 1,
    "position": "백엔드 주니어 개발자",
    "reward": 1000000,
    "content": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    "skill": "Python",
    "recruitID": "1",
    "createdAt": "2023-10-12T11:39:07.000Z",
    "updatedAt": "2023-10-12T11:39:07.000Z"
  }
}
```

#### ERROR(404)

```json
{
  "message": "Company with ID 99 not found.",
  "error": "Not Found",
  "statusCode": 404
}
```

### 2. 채용공고를 수정합니다.

`PATCH /recruitment/:id`

#### Request(Body)

```json
{
  "position": "백엔드 주니어 개발자",
  "reward": 1500000,
  "content": "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
  "skill": "NodeJS"
}
```

#### Response(200)

```json
{
  "message": "채용공고 11번을 수정하였습니다.",
  "data": {
    "position": "백엔드 주니어 개발자",
    "reward": 1500000,
    "content": "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
    "skill": "NodeJS"
  }
}
```

#### ERROR(400)

```json
{
  "message": "채용공고의 position/reward/content/skill 내용이 비어있습니다.",
  "error": "Bad Request",
  "statusCode": 400
}
```

### 3. 채용공고를 삭제합니다.

`DELETE /recruitment/:id`

#### Response(200)

```json
{
  "message": "채용공고 14번을 삭제하였습니다."
}
```

#### ERROR(404)

```json
{
  "message": "채용공고 14번이 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```

### 4. 채용공고 목록을 가져옵니다.

`GET /recruitment`

- Parameters
    - page: 페이지 번호(기본값: 1)
    - rows: 페이지 당 채용공고 개수(기본값: 10)
    - sort: 정렬 방식(기본값: DESC, DESC/ASC)
    - search: 검색 키워드

#### Response(200)

##### 4-1. 채용공고 목록 확인

`GET /recruitment?page=1&rows=10&sort=DESC`

```json
{
  "message": "채용공고를 검색하였습니다.",
  "data": [
    {
      "recruitID": 30,
      "position": "백엔드 주니어 개발자",
      "reward": 1500000,
      "skill": "Python",
      "companyID": 1,
      "companyName": "원티드랩",
      "country": "한국",
      "region": "서울"
    },
    {
      "recruitID": 29,
      "position": "백엔드 주니어 개발자",
      "reward": 1000000,
      "skill": "NodeJS",
      "companyID": 3,
      "companyName": "넥슨",
      "country": "한국",
      "region": "판교"
    },
    {
      "recruitID": 28,
      "position": "프론트엔드 개발자",
      "reward": 500000,
      "skill": "javascript",
      "companyID": 1,
      "companyName": "원티드랩",
      "country": "한국",
      "region": "서울"
    },
    ...
  ]
}
```

#### Response(200)

##### 4-2. 채용공고 검색

`GET /recruitment?page=1&rows=10&sort=ASC&search=nodejs`

```json
{
  "message": "채용공고를 검색하였습니다.",
  "data": [
    {
      "recruitID": 10,
      "position": "백엔드 주니어 개발자",
      "reward": 1500000,
      "skill": "NodeJS",
      "companyID": 1,
      "companyName": "원티드랩",
      "country": "한국",
      "region": "서울"
    },
    {
      "recruitID": 26,
      "position": "NodeJS 주니어 개발자",
      "reward": 1500000,
      "skill": "Typescript",
      "companyID": 1,
      "companyName": "원티드랩",
      "country": "한국",
      "region": "서울"
    },
    {
      "recruitID": 29,
      "position": "백엔드 주니어 개발자",
      "reward": 1000000,
      "skill": "NodeJS",
      "companyID": 3,
      "companyName": "넥슨",
      "country": "한국",
      "region": "판교"
    },
    ...
  ]
}
```

### 5. 채용공고 상세 페이지를 가져옵니다.

`GET /recruitment/:id`

#### Response(200)

```json
{
  "message": "채용 상세 페이지 10번을 검색하였습니다.",
  "data": {
    "recruitID": 10,
    "position": "백엔드 주니어 개발자",
    "reward": 1500000,
    "content": "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
    "skill": "NodeJS",
    "companyID": 1,
    "companyName": "원티드랩",
    "country": "한국",
    "region": "서울",
    "otherRecruitment": [
      10,
      15,
      ...
    ]
  }
}
```

#### ERROR(404)

```json
{
  "message": "회사 ID 99번이 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```

### 6. 사용자는 채용공고에 지원합니다.

`GET /recruitment/:id/apply`

#### Request(Body)

```json
{
  "userID": "creator98@naver.com"
}
```

#### Response(200)

```json
{
  "message": "10번 채용공고에 지원하였습니다.",
  "data": {
    "recruitID": "10",
    "userID": "creator98@naver.com",
    "createdAt": "2023-10-12T11:39:07.000Z",
    "updatedAt": "2023-10-12T11:39:07.000Z"
  }
}
```

#### ERROR(400)

```json
{
  "message": "이미 creator98@naver.com가 지원한 채용공고입니다.",
  "error": "Bad Request",
  "statusCode": 400
}
```

#### ERROR(404)

```json
{
  "message": "채용공고 99번이 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```
