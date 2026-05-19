# Attendance Management System

## Project Overview

Attendance Management System is a MERN Stack based web application for managing student attendance.

The system supports:

- Faculty Authentication
- Admin Authentication
- JWT Authorization
- Role Based Access Control
- Attendance CRUD Operations
- Faculty-wise Attendance Management
- Frontend + Backend Integration

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

- React.js
- Vite
- Axios
- JSX
- CSS

---

## Features Completed

### Backend Authentication

✔ User Registration

✔ User Login

✔ Password Hashing using bcrypt

✔ JWT Token Generation

✔ Protected Routes

---

### Role Based Access Control

✔ FACULTY Role

✔ ADMIN Role

✔ Authentication Middleware

✔ Authorization Middleware

---

### Attendance Module

✔ Mark Attendance

✔ Get Attendance

✔ Get Student Attendance

✔ Update Attendance

✔ Delete Attendance

✔ Faculty-specific Attendance Access

✔ Admin Access to All Attendance Data

---

### Frontend Progress

✔ React Frontend Setup using Vite

✔ Project Folder Structure Setup

✔ Axios Configuration

✔ Login UI Created

✔ Backend API Connection Started

---

## Project Structure

```text
ATTENDANCE-MANAGEMENT
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Installation

Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection
PORT=5000
JWT_SECRET=your_secret_key
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Modules

- Authentication APIs
- Attendance APIs
- Student APIs
- Faculty APIs
- Subject APIs

---

## Current Development Status

### Backend

✔ Completed

### Frontend

🚧 In Progress

Current frontend module:

- Login UI
- API Integration
- JWT Handling (next step)
- Dashboard Development (upcoming)

---

## Future Enhancements

- Faculty Dashboard
- Admin Dashboard
- Attendance Analytics
- Syllabus Coverage Module
- Reports & Filtering