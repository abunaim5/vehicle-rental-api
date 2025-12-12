# Vehicle Rental System – Backend API

A modular, production-ready backend API for managing a complete Vehicle Rental System, featuring user authentication, vehicle inventory, rental bookings, and secure role-based access control.

## Live URL

**API URL:** `https://vehicle-rental-api-lilac.vercel.app`

## Features

### Authentication & Authorization
- Secure JWT-based authentication
- Password hashing using bcrypt
- Role-based access: admin vs customer
- Protected routes with middleware validation

### Vehicle Management
- Add, update, delete vehicles (Admin only)
- Automatic availability status tracking
- Public vehicle listing & detail view

### User Management
- Register & login
- Admin can view/update/delete any user
- Customers can update their own profile

### Booking Management
- Create new bookings with date validation
- Auto price calculation based on rental duration
- Update booking status (cancel / return)
- Admin can mark vehicles as returned
- System auto-returns booking after end date (logic design without cron)

## Technology Stack

| Technology                              | Purpose                         |
| --------------------------------------- | ------------------------------- |
| **Node.js + TypeScript**                | Backend runtime & strong typing |
| **Express.js**                          | Web framework                   |
| **PostgreSQL**                          | Relational database             |
| **pg (node-postgres)**                  | Database connectivity           |
| **bcrypt**                              | Password hashing                |
| **jsonwebtoken (JWT)**                  | Authentication                  |

## Project Setup & Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the repository:**

    ```bash
    cd <repository-folder>
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Configure environment variables:** Create a `.env` file and add the necessary configurations.

    ```bash
    DATABASE_URL=postgresql://username:password@host:port/dbname
    JWT_SECRET=your-secret-key
    PORT=5000
    ```

5. **Start the development server:**

    ```bash
    npm run dev
    ```

6. **Build & Run Production:**

    ```bash
    npm run build
    ```

7. **API base endpoint:**

    `http://localhost:5000/api/v1`
