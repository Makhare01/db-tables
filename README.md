# DB Tables (React + TypeScript + Vite)

This is a web application that allows users to create database tables, fill table data, edit and delete created table.

## Run project locally

1. Clone frontend repository

```bash
git clone git@github.com:Makhare01/db-tables.git
```

2. Install dependencies

```bash
npm install
```

3. Run frontend project (it will serve project on http://localhost:3000)

```bash
npm start
```

4. Clone backend repository

```bash
git clone git@github.com:Makhare01/db-tables-server.git
```

2. Install dependencies

```bash
npm install
```

3. Run backend project (it will serve project on http://localhost:8080)

```bash
npm run dev
```

## Deployed project links

1. Frontend: https://db-tables.vercel.app/sign-in
2. Backend: https://db-tables-server.vercel.app/api

## Project overview

### Pages

- Sign in - user authorization
- Sign up - user registration
- Dashboard - statistics about tables created by user and documents filled in this table (Bar chart)
- Profile - user personal information
  - Update profile info
  - Change password
- Create table - form for creating new table
- My tables - list of tables created by me (Private tables)
  - Table details - table detail information
  - Table data grid with sorting, filtering and pagination functionalities
    - Delete table - button for delete table
    - Edit Table - page for editing table information and columns
    - Add data - page for adding data to table
- Public tables - tables list with 'Public' table visibility
  - Table details - table detail information
  - Table data grid with sorting, filtering and pagination functionalities

### Used libraries

- Material UI (@mui/material)
- TanStack React Query (@tanstack/react-query)
- Zod (zod)
- React hook form (react-hook-form)
- Date fns (date-fns)
- JWT Decode (jwt-decode)
- React router dom (react-router-dom)
- React toastify (react-toastify)
- React use (react-use)
- Rechars (recharts)
- TS Pattern (ts-pattern)
