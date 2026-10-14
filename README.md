# Ethixweb India — Website Redesign

A modern, responsive business website redesign for Ethixweb India, featuring a clean user interface and a functional enquiry management system.

## Project Overview

This project redesigns the Ethixweb India website to provide visitors with a professional experience when exploring services and submitting project enquiries.

It includes a public-facing website and a secure admin dashboard for managing customer enquiries.

## Features

- Responsive Home, Services, About, and Contact pages
- Project enquiry form with input validation
- Honeypot field for basic spam prevention
- Rate limiting for enquiry submissions
- MongoDB database integration
- Admin login with JWT authentication
- Protected admin dashboard
- View, update, and delete enquiries
- Enquiry statuses: New, Contacted, and Closed

## Technology Stack

**Frontend:** React, Vite, CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB Atlas with Mongoose

**Authentication and security:** JWT, bcryptjs, input validation, rate limiting, and honeypot spam protection

## Project Structure

```text
ethixweb-india/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a MongoDB instance

### 1. Set up the backend

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder with your own configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_strong_admin_password
JWT_SECRET=your_random_secret
```

Keep the actual `.env` file private. Never upload real credentials to GitHub.

### 2. Run the backend

From the `backend` folder:

```bash
npm run dev
```

The backend runs at `http://localhost:5000` by default.

### 3. Set up the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Admin Dashboard

Visit `/admin` on the website to open the admin login page.

After authentication, the administrator can view submitted enquiries, update their status, and delete enquiries.

Admin credentials are configured through backend environment variables and should not be committed to the repository.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/leads` | Submit a new enquiry |
| POST | `/api/admin/login` | Admin authentication |
| GET | `/api/admin/leads` | Retrieve enquiries (protected) |
| PATCH | `/api/admin/leads/:id` | Update enquiry status |
| DELETE | `/api/admin/leads/:id` | Delete an enquiry |

## Design Rationale

The redesign focuses on clear navigation, professional presentation, responsive layouts, and a straightforward enquiry journey. Connecting the contact form to a database-backed admin dashboard makes the website functional beyond a static design.

## Security Considerations

- Sensitive configuration is stored in environment variables.
- Admin dashboard API routes require authentication.
- Enquiry submissions include validation and basic spam protection.
- The `.env` file must be excluded from version control.

## Future Improvements

- Email notifications for new enquiries
- Automated frontend and backend tests
- Enhanced accessibility and performance monitoring
- Additional admin roles and audit logging

## Author

Developed as a website redesign assignment for Ethixweb India.