# fullstack test

## Introduction

### Backend: Using clean architecture with expressjs

### Frontend: Using reactjs, redux-toolkit, tailwind css

### Database: Postgres

### Database initialization

- cd backend folder
- Start docker: docker-compose -f docker-compose.local.yml
- Go to PgAdmin (http://localhost:5050) to register a server
  - General name: localhost
  - Connection host name/address: fullstack-test-postgres (postgres container name)
  - Create database: posts

## Database migrations

If you have made changes to database entities and need to generate a new
migration, you can do so by issuing the following command:

```sh
$ cd backend
$ yarn run typeorm migration:generate -d src/infrastructure/adapters/type-orm/data-source.ts src/infrastructure/adapters/type-orm/migrations/{migration-name}
```

## Quick start

You can run the project (both frontend and backend) locally with:

```sh
$ npm run dev
```

### Frontend

- cd frontend folder
- npm install
- npm run dev

### Backend

- cd backend folder
- npm install
- npm run dev

### Facebook App

- Create a facebook app (choose type: others)
- Create a facebook page
- open Facebook Graph API Explorer
- select facebook app and page, grant permission: pages_show_list
  +pages_read_engagement
  +pages_read_user_content
  +pages_manage_posts
  +pages_manage_engagement
- copy access_token and page_id then paste them to the backend .env file
