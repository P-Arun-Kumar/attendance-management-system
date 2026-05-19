# Attendance Management System

## Project Overview

Attendance Management System is a MERN stack based application for managing student attendance.

This system supports:

- Faculty Login Authentication
- JWT Based Authorization
- Role Based Access Control
- Attendance CRUD Operations
- Faculty and Admin Access Management

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Frontend
- React (To be developed)

---

## Features Completed

### Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Token Generation
- Protected Routes

### Role Based Access
- Faculty Role
- Admin Role
- Route Authorization Middleware

### Attendance Module
- Mark Attendance
- Get Attendance
- Get Student Attendance
- Update Attendance
- Delete Attendance

---

## Project Structure

```text
backend
 ├── controllers
 ├── middlewares
 ├── models
 ├── routes
 ├── config
 └── server.js
```

---

## Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
cd backend
npm install
```

Create .env file:

```env
MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm run dev
```

---

## API Modules

- Auth APIs
- Attendance APIs
- Student APIs
- Faculty APIs
- Subject APIs

---

## Current Status

Backend development completed.

Frontend development in progress.
