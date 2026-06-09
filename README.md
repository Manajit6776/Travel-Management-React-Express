# Voyage Vista - Travel Management System (React + Express + Node.js + MySQL)

This is a modern React + Express + Node.js + MySQL version of the original PHP-based Travel Management System.

## Project Structure

```
tms/
├── backend/                 # Express.js API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded package images
│   ├── server.js          # Express server entry point
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
└── frontend/              # React frontend
    ├── src/
    │   ├── components/    # Reusable components (Navbar, Footer)
    │   ├── context/       # React Context (AuthContext)
    │   ├── pages/         # Page components
    │   ├── App.jsx        # Main app with routing
    │   └── main.jsx       # React entry point
    ├── index.html         # HTML template
    └── package.json       # Frontend dependencies
```

## Features

- **User Authentication**: Register, login, logout with JWT tokens
- **Package Management**: Browse, view details, and book travel packages
- **Booking System**: Create bookings, view booking status, and manage bookings
- **Admin Dashboard**: Manage packages and bookings, approve/reject bookings
- **Messaging System**: Conversation between users and admin about bookings
- **Responsive Design**: Mobile-friendly UI using Bulma CSS framework

## Database Setup

1. Create a MySQL database named `tms_lite`
2. Import the SQL file: `tms_lite.sql` (located in the project root)
3. Update the database credentials in `backend/.env` file

## Environment Variables

Update the `backend/.env` file with your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tms_lite
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:5173
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update the `.env` file with your database credentials

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

From the backend directory:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend API will run on `http://localhost:5000`

### Start the Frontend Development Server

From the frontend directory:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (protected)

### Packages
- GET `/api/packages` - Get all packages
- GET `/api/packages/limited?limit=6` - Get limited packages (for home page)
- GET `/api/packages/:id` - Get single package
- POST `/api/packages` - Create package (admin only)
- PUT `/api/packages/:id` - Update package (admin only)
- DELETE `/api/packages/:id` - Delete package (admin only)

### Bookings
- POST `/api/bookings` - Create booking (user only)
- GET `/api/bookings/my-bookings` - Get current user's bookings
- GET `/api/bookings` - Get all bookings (admin only)
- GET `/api/bookings/:id` - Get single booking
- PATCH `/api/bookings/:id/status` - Update booking status (admin only)

### Messages
- POST `/api/messages` - Send message
- GET `/api/messages/booking/:booking_id` - Get messages for a booking

## Default Admin User

The SQL file includes a default admin user:
- Email: `admin@example.com`
- Password: (You'll need to set this - the hash in the SQL file needs to be updated)

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- Multer (file uploads)
- CORS

### Frontend
- React
- React Router
- Axios
- Bulma CSS Framework
- Font Awesome

## Notes

- The application uses JWT tokens for authentication
- Images are stored in the `backend/uploads` directory
- The frontend uses Bulma CSS for styling (loaded via CDN)
- Font Awesome icons are loaded via CDN
- The database schema remains the same as the original PHP version

## Database Credentials Required

Please provide your MySQL database credentials to configure the backend:
- DB_HOST (default: localhost)
- DB_USER (default: root)
- DB_PASSWORD (your MySQL password)
- DB_NAME (default: tms_lite)

Update these in the `backend/.env` file before running the application.
