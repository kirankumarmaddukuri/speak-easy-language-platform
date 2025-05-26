# Speak Easy Language Platform 🌍

A modern, interactive language learning platform that helps users master new languages through an engaging and personalized learning experience.

## Overview

Speak Easy is a full-stack language learning application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform provides users with a comprehensive suite of tools for language learning, including interactive lessons, quizzes, progress tracking, and a doubt submission feature.

## Features ✨

- **User Authentication**
  - Secure JWT-based authentication
  - User profile management
 

- **Learning Experience**
  - Interactive lessons and exercises
  - Progress tracking and analytics
  - Personalized learning paths
  - Multiple language support

- **Quizzes**
  - Create, update, and delete quizzes
  - Track quiz results and history
  - Leaderboard for quizzes by language and topic

- **Doubt Submission**
  - Submit doubts/questions related to languages and topics
  - View and manage doubts

- **Technical Features**
  - Responsive design for all devices
  - Secure data handling
  - Performance optimized

## Tech Stack 🛠

### Frontend
-HTML
-Javascript
- React.js (v18)
- CSS,Material-UI (MUI) for UI components
- Axios for API calls
- React Router DOM (v5) for navigation
- React Icons for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin resource sharing
- dotenv for environment variable management

### Development Tools
- Nodemon for backend development
- Git for version control
- ESLint for code quality
- Prettier for code formatting
- Jest for testing

## Getting Started 🚀

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/speak-easy-final.git
cd speak-easy-final
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables

Create a `.env` file in the `backend` directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure 📁

```
speak-easy-final/
├── frontend/           # React frontend application
├── backend/            # Node.js backend server
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Backend Scripts

- `npm start` - Start the backend server
- `npm run dev` - Start the backend server with nodemon for development

## Frontend Scripts

- `npm start` - Start the frontend development server
- `npm build` - Build the frontend for production
- `npm test` - Run frontend tests



## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


