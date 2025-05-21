# Restaurant Management System Backend

This is the backend API for the Restaurant Management System, built with Node.js, Express, and MongoDB (Mongoose).

## Features

- Table management (CRUD)
- MongoDB database connection
- RESTful API endpoints
- Seed script for dummy data

## Requirements

- Node.js (v14+ recommended)
- MongoDB database (local or Atlas)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   - The MongoDB connection string is currently hardcoded in `config/db.js` and `seedTables.js`. For production, move this to an `.env` file and use `process.env.MONGO_URI`.

3. **Run the server:**

   ```bash
   npm run dev
   # or


   The server will start on port 5000 by default.

   ```

4. **Seed dummy tables (optional):**
   ```bash
   node seedTables.js
   ```

## API Endpoints

### Root

- `GET /` — Welcome message (health check)

### Tables

- `GET /api/tables` — Get all tables
- `POST /api/tables` — Add a new table
  - Body: `{ name?: string, chairs: number }`
- `DELETE /api/tables/:id` — Delete a table by ID

## Data Model

**Table**

```
{
  name: String,         // required
  status: String,       // 'available' or 'reserved', default 'available'
  chairs: Number        // required, min 1
}
```

## Project Structure

```
backend/
  app.js              # Main server file
  config/db.js        # MongoDB connection
  models/Table.js     # Table Mongoose model
  controllers/        # Route controllers
  routes/             # Express route definitions
  seedTables.js       # Dummy data seeder
  package.json        # NPM config
```

## License

ISC
