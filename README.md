# Mini Employee Management Portal

## Overview
I have developed this Mini Employee Management Portal as part of the Full Stack Developer assignment.  
The goal of this project is to demonstrate my understanding of building a modern full-stack application, including backend API development, frontend integration, authentication, and clean UI implementation.

The application provides authentication, a dashboard view, and employee management functionality using a RESTful API.

---

## Assignment Scope Covered
- Login with basic authentication (JWT)
- Dashboard / landing page after login
- Employee management (Add, Edit, Delete, View)
- Backend and frontend integration
- Modern UI aligned with current UI/UX standards
- Clean and structured project setup

---

## Tech Stack Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- cors
- nodemon

### Frontend
- React
- React Router DOM
- Axios
- **shadcn/ui**

> **Note:**  
> Although the assignment suggested UI libraries such as Material UI or Ant Design, I used **shadcn/ui**, a modern component system built on Tailwind CSS. It provides clean, accessible, and customizable components while aligning with current design best practices.

---

## Features Implemented
- JWT-based authentication
- Protected routes for authenticated users
- Dashboard view after login
- Employee management (Add, View, Edit, Delete)
- RESTful API integration
- MongoDB data persistence

---

## Project Structure
```text
NavsanInterview/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── package.json
└── README.md
```
---

## Prerequisites

Ensure the following are installed on your system before running the project:

- Node.js (v18 or above recommended)
- npm
- MongoDB (local instance or MongoDB Atlas)
- Git

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Guvvalla123/NavsanInterview.git
cd NavsanInterview
```
### 2. Install Backend Dependencies
```
cd backend
npm install
```
### 3. Environment Varaiabels
Create a .env file inside the backend folder:
```
PORT = 5000
MONGO_URI=mongodb://localhost:27017/navsanEmployeeUI
JWT_SECRET=your_jwt_secret_key
```
### 4. Start Backend Server
```
npx nodemon server.js
```
http://localhost:5000

# 5.Frontend Setup and Start
```
cd ../frontend
npm install
npm run dev
```
http://localhost:5173

```


