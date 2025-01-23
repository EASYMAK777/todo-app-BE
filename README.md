# Todo List API

A simple task management API built with Node.js, Express, TypeScript, and MySQL.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

-   Copy `.env.example` to `.env`
-   Update database credentials in `.env`

3. Setup database:

```bash
npm run prisma:generate
npm run prisma:migrate
```

## Run the App

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

## API Endpoints

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| GET    | `/tasks`                       | Get all tasks            |
| POST   | `/tasks`                       | Create task              |
| PUT    | `/tasks/:id`                   | Update task              |
| DELETE | `/tasks/:id`                   | Delete task              |
| PATCH  | `/tasks/:id/toggle-completion` | Toggle completion status |
