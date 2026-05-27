# TaskManager Backend API

RESTful API for TaskManager application built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Quick Start
```bash
npm install
cp .env.example .env
npm run dev
```

## 📚 API Documentation

See main [README.md](../README.md#api-documentation) for complete API documentation.

## 🧪 Testing
```bash
npm test                    # Run tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

## 🏗️ Architecture

- **Controllers**: Handle HTTP requests
- **Services**: Business logic
- **Repositories**: Database operations
- **DTOs**: Input validation with Zod
- **Middlewares**: Auth, validation, errors

## 📝 Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://taskmanager_user:vSbpwynfxg6h1XYG@taskmanagercluster.c2lcolq.mongodb.net/?appName=TaskManagerCluster
JWT_SECRET=b11f7aafcd33b320b61aada8745b9a8697a14d31b58c17cbddf608b0a26b8c8eb3700de2310b45bca3414efab23e8c9d96e3bbe586671648f3aa00f654a1b0b3
JWT_EXPIRE=7d
CORS_ORIGIN=https://task-manager-app-ms.netlify.app

```

## 🔌 Socket.io Events

- `task:created` - New task created
- `task:updated` - Task updated
- `task:deleted` - Task deleted
- `notification` - New notification