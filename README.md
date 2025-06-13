# rails_nextjs_starter
Monorepo for Rails API and NextJS web application.

---

## Getting Started

### 1. API (Rails 8, Ruby 3.4.1)

**Location:** `api/`

#### Features

- Rails 8 API-only (no views/assets)
- Supabase-style JSON response conventions
- Built-in authentication (email/password, session tokens, password reset)
- Consistent error handling
- API documentation

#### Setup

```sh
cd api
bundle install
rails db:create db:migrate
rails server
```

- The API will run on [http://localhost:3000](http://localhost:3000) by default.

#### API Response Convention

All responses follow this structure:

**Success:**
```json
{
  "data": { /* payload */ },
  "error": null
}
```
**Error:**
```json
{
  "data": null,
  "error": {
    "message": "Human-readable error",
    "code": "snake_case_code",
    "details": { /* optional */ }
  }
}
```
**Paginated:**
```json
{
  "data": [ /* items */ ],
  "error": null,
  "pagination": {
    "total": 25,
    "per_page": 10,
    "current_page": 1,
    "next_page": 2,
    "prev_page": null
  }
}
```

See [`api/docs/authentication.md`](api/docs/authentication.md) for authentication endpoints.

---

### 2. Web (Next.js 15)

**Location:** `web/`

#### Features

- Next.js 15 (App Router)
- ShadCN UI components
- TailwindCSS v4
- Zod for form validation
- API client in `lib/api/client.js`
- Organized API endpoint files in `lib/api/`
- No TypeScript

#### Setup

```sh
cd web
npm install
npm run dev
```

- The frontend will run on [http://localhost:3001](http://localhost:3001) by default.

---

## Development Workflow

- **Backend:** Make changes in `api/`, restart Rails server as needed.
- **Frontend:** Make changes in `web/`, Next.js supports hot reloading.

---

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration.

## License

MIT
