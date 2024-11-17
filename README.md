# Assignment-1_FSAD_Book
Book Exchange Platform: Bind and Borrow
Welcome to the Book Exchange Platform, a full-stack web application that allows users to exchange books with others. Users can list books they wish to give away, search for books added by others, propose exchanges, and manage their listings. The platform is built using React, Node.js, Express, and MongoDB.

Features
User Authentication: Register, login, logout, and password recovery via OTP.
Book Management: Add, edit, delete books with details like title, author, genre, condition, availability, and location.
Search and Filter: Search for books by title, author, or genre, and filter by condition, genre, and location.
Book Exchange Proposals: Propose exchanges with other users.
Dashboard: A user-specific dashboard for managing books and viewing proposals.
Technologies Used
Frontend: React, CSS, react-select-country-list for country dropdown.
Backend: Node.js, Express, JWT for authentication, and Nodemailer for email service.
Database: MongoDB for data storage.

Prerequisites
Before setting up the application, ensure you have the following installed:
Node.js (v14 or later)
MongoDB (running locally or a MongoDB Atlas URI)
Git

Setup Instructions
1. Clone the Repository
git clone https://github.com/yourusername/Assignment-1_FSAD_Book.git
cd book-exchange-platform

2. Set Up the Backend
Navigate to the backend folder:
cd backend

Install dependencies:
npm install
Create a .env file:
touch .env

Configure Environment Variables: Open .env and add the following variables:
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<your-email@example.com>
EMAIL_PASS=<your-email-password>
EMAIL_SERVICE=gmail
Note: If you are using Gmail for emails, ensure your account is configured for secure app access, and consider using an app password for added security.In you gmail account go to app password set a name for the application for exaple "Book Exchange" set a password and use the same password in the .env file.

Start the backend server:
npm start
The server should now be running at http://localhost:5000.

3. Set Up the Frontend
Navigate to the frontend folder:
cd ../frontend

Install dependencies:
npm install

Start the frontend development server:
npm start
The frontend server should now be running at http://localhost:3000.

4. Running the Application
With both frontend and backend servers running, open a browser and go to http://localhost:3000 to access the Bind and Borrow.

Project Structure
The project has the following structure:

book-exchange-platform
├── backend
│   ├── models
│   ├── routes
│   ├── config
│   ├── middleware
│   ├── .env
│   └── server.js
└── frontend
    ├── src
    │   └── components
    │        └── styles
    │   ├── App.js
    ├── index.js   
    └── App.js

Backend:

models/: Contains the Mongoose schemas for User and Book.
routes/: Defines routes for authentication, book management, and searching.
server.js: Main server file to initialize Express and middleware.

Frontend:

src/components/: Contains reusable UI components.
src/pages/: Contains pages for dashboard, book listing, search, etc.
App.js: Main application file.
index.js: Entry point for React app.

API Endpoints

Auth Routes (/api/auth):
POST /register: Register a new user.
POST /login: Authenticate and login a user.
POST /forgot-password: Initiate password recovery via email.
POST /reset-password: Reset user password using OTP.

Book Routes (/api/books):
GET /: Fetch all books added by the logged-in user.
POST /: Add a new book listing.
PUT /:id: Edit an existing book.
DELETE /:id: Delete a book listing.
GET /search-books: Search for books by keyword, filterable by condition, genre, location, and availability.

Environment Variables
Backend:
PORT: Port for the backend server.
MONGODB_URI: MongoDB connection URI.
JWT_SECRET: Secret key for JWT authentication.
EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS: Configuration for sending emails.

Frontend:
REACT_APP_API_URL: URL of the backend API.

Future Improvements
Exchange Proposals: Implement full functionality to propose and manage book exchanges between users.
Enhanced Filtering: Allow multi-level and more dynamic filters (e.g., by city within countries).
User Notifications: Notify users of new exchange proposals or messages.
Advanced Security: Add multi-factor authentication and CAPTCHA for added security.
