# 🚀 TaskManager - Collaborative Task Management System

A modern, full-stack task management application built with React, Node.js, Express, MongoDB, and Socket.io for real-time collaboration.

![TaskManager Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=TaskManager+-+Collaborative+Task+Management)

## ✨ Features

### Core Functionality
- ✅ **User Authentication** - Secure JWT-based authentication with HttpOnly cookies
- ✅ **Task Management** - Complete CRUD operations for tasks
- ✅ **Real-time Collaboration** - Instant updates using Socket.io
- ✅ **Smart Notifications** - In-app notifications for task assignments
- ✅ **Advanced Filtering** - Filter by status, priority, and sort by date
- ✅ **Role-based Access** - Only creators can delete tasks
- ✅ **Responsive Design** - Fully responsive from mobile to 4K screens

### Task Features
- **Title & Description** - Rich task details (max 100 chars for title)
- **Due Dates** - Track deadlines and overdue tasks
- **Priority Levels** - Low, Medium, High, Urgent
- **Status Tracking** - To Do, In Progress, Review, Completed
- **Assignment** - Assign tasks to registered users
- **Creator Tracking** - Know who created each task

### Dashboard Features
- 📊 **Statistics Cards** - Visual overview of task counts
- 📋 **My Assigned Tasks** - Tasks assigned to you
- 📝 **My Created Tasks** - Tasks you created
- ⚠️ **Overdue Tasks** - Highlighted overdue tasks
- 🔔 **Real-time Updates** - Live task synchronization

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Real-time**: Socket.io
- **Validation**: Zod
- **Testing**: Jest & Supertest
- **CORS**: cors middleware

### Architecture
- **Design Pattern**: MVC with Service/Repository pattern
- **API**: RESTful API design
- **Real-time**: WebSocket for live updates
- **Security**: HttpOnly cookies, CORS, input validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/task-manager-fullstack.git
cd task-manager-fullstack
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Backend Environment Variables** (`.env`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://taskmanager_user:vSbpwynfxg6h1XYG@taskmanagercluster.c2lcolq.mongodb.net/?appName=TaskManagerCluster
JWT_SECRET=b11f7aafcd33b320b61aada8745b9a8697a14d31b58c17cbddf608b0a26b8c8eb3700de2310b45bca3414efab23e8c9d96e3bbe586671648f3aa00f654a1b0b3
JWT_EXPIRE=7d
CORS_ORIGIN=https://task-manager-app-ms.netlify.app

```
```bash
# Start MongoDB (if using local)
mongod

# Run backend in development mode
npm run dev

# Or build and run in production
npm run build
npm start
```

### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Frontend Environment Variables** (`.env`):
```env
VITE_API_URL=https://taskmanager-api-aj0h.onrender.com/api
VITE_SOCKET_URL=https://taskmanager-api-aj0h.onrender.com
```
```bash
# Run frontend in development mode
npm run dev

# Or build for production
npm run build
npm run preview
```

### 4. Access the Application

- **Frontend**: https://task-manager-app-ms.netlify.app
- **Backend API**: https://taskmanager-api-aj0h.onrender.com
- **API Health Check**: http://localhost:5000/health

## 📁 Project Structure
```
task-manager-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Socket configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── dtos/           # Data Transfer Objects (Validation)
│   │   ├── middlewares/    # Auth, validation, error handling
│   │   ├── models/         # Mongoose models
│   │   ├── repositories/   # Database operations
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Helper functions
│   │   ├── tests/          # Unit tests
│   │   ├── app.ts          # Express app configuration
│   │   └── server.ts       # Server entry point
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/      # Login/Register forms
│   │   │   ├── common/    # Reusable components
│   │   │   ├── dashboard/ # Dashboard components
│   │   │   ├── layout/    # Layout components
│   │   │   └── tasks/     # Task components
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Helper functions
│   │   ├── App.tsx        # Main App component
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## 🔌 API Documentation

### Base URL
```
https://task-manager-app-ms.netlify.app/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks?status=To Do&priority=High&sortBy=-createdAt
Authorization: Bearer <token>
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task manager project",
  "dueDate": "2025-12-31",
  "priority": "High",
  "status": "To Do",
  "assignedToId": "userId123"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "Urgent"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get My Assigned Tasks
```http
GET /api/tasks/assigned/me
Authorization: Bearer <token>
```

#### Get My Created Tasks
```http
GET /api/tasks/created/me
Authorization: Bearer <token>
```

#### Get Overdue Tasks
```http
GET /api/tasks/overdue
Authorization: Bearer <token>
```

### User Endpoints

#### Get All Users
```http
GET /api/users
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

#### Get Notifications
```http
GET /api/users/notifications
Authorization: Bearer <token>
```

#### Get Unread Notifications
```http
GET /api/users/notifications/unread
Authorization: Bearer <token>
```

#### Mark Notification as Read
```http
PUT /api/users/notifications/:id/read
Authorization: Bearer <token>
```

#### Mark All Notifications as Read
```http
PUT /api/users/notifications/read-all
Authorization: Bearer <token>
```

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage report
```

### Test Coverage
The project includes unit tests for critical business logic:
- Task creation validation
- Task update permissions
- Task deletion authorization
- Real-time notification creation

## 🏗️ Architecture & Design Decisions

### Why MongoDB?
- **Flexible Schema**: Easy to iterate on task structure
- **JSON-like Documents**: Natural fit for JavaScript/TypeScript
- **Scalability**: Horizontal scaling capabilities
- **Rich Query Language**: Complex filtering and aggregation

### Service/Repository Pattern
- **Separation of Concerns**: Business logic separated from data access
- **Testability**: Easy to mock repositories for testing
- **Maintainability**: Clear code organization
- **Reusability**: Services can be reused across controllers

### JWT Authentication
- **Stateless**: No server-side session storage
- **Scalable**: Works well with microservices
- **Secure**: HttpOnly cookies prevent XSS attacks
- **Standard**: Industry-standard authentication

### Socket.io Integration
- **Real-time Updates**: Instant task synchronization
- **Bi-directional**: Server can push updates to clients
- **Fallback**: Graceful degradation to polling
- **Room-based**: Efficient user-specific notifications

### React Query (TanStack Query)
- **Caching**: Automatic data caching
- **Refetching**: Smart background updates
- **Optimistic Updates**: Better UX
- **Loading States**: Built-in loading management

## 🔐 Security Features

- ✅ **Password Hashing**: bcrypt with salt rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **HttpOnly Cookies**: XSS protection
- ✅ **CORS**: Cross-origin resource sharing
- ✅ **Input Validation**: Zod schema validation
- ✅ **Error Handling**: Proper error messages without exposing internals
- ✅ **Authorization**: Role-based access control

## 🎨 UI/UX Features

- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Dark Mode Ready**: Prepared for dark theme
- ✅ **Animations**: Smooth transitions and micro-interactions
- ✅ **Loading States**: Skeleton loaders
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Accessibility**: Semantic HTML and ARIA labels
- ✅ **Toast Notifications**: Non-intrusive feedback

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variables:
     - `VITE_API_URL`: Your backend URL
     - `VITE_SOCKET_URL`: Your backend URL
   - Deploy!
   https://task-manager-app-ms.netlify.app

### Backend Deployment (Render)

1. **Create `render.yaml`** (in backend directory)
2. **Push to GitHub**
3. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Set root directory to `backend`
   - Add environment variables
   - Deploy!
https://taskmanager-api-aj0h.onrender.com
### Database (MongoDB Atlas)

1. **Create cluster** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Get connection string**
3. **Update MONGODB_URI** in backend environment

## 📝 Trade-offs & Assumptions

### Trade-offs
1. **MongoDB vs PostgreSQL**: Chose MongoDB for flexibility, though PostgreSQL offers better relational integrity
2. **JWT in Cookies**: More secure but requires CORS configuration
3. **Socket.io Rooms**: Simple but could use Redis for scaling
4. **Client-side Filtering**: Better UX but could be server-side for large datasets

### Assumptions
1. Users have stable internet for real-time features
2. Task titles limited to 100 characters
3. One user can't be assigned to multiple tasks simultaneously (can be changed)
4. Notifications stored permanently (could add cleanup)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@Mayank3847](https://github.com/Mayank3847)
- LinkedIn: [Mayank Shekhar](https://www.linkedin.com/in/mayank-shekhar-44a81328a/)
- Email: mayankshekhar0303@gmail.com

## 🙏 Acknowledgments

- Anthropic Claude for development assistance
- React Team for amazing framework
- Tailwind CSS for utility-first CSS
- Socket.io for real-time capabilities

## 📞 Support

For support, email mayankshekhar0303@gmail.com and contact no.7295059168 or open an issue on GitHub.

---

**Made with ❤️ and ☕**
Create LICENSE File

**File: `LICENSE`**
```
MIT License

Copyright (c) 2025 [Mayank Shekhar]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.