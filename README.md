# ProjectHub - Project Management Application

A full-stack project management application with role-based access control, task tracking, and team collaboration features.

## 🚀 Features

### Authentication & Authorization
- User signup and login with JWT authentication
- Role-based access control (Admin/Member)
- Secure password hashing with bcryptjs
- Token-based session management

### Project Management
- Create and manage projects
- Add team members to projects
- Update project details
- Delete projects
- View all assigned projects

### Task Management
- Create tasks within projects
- Assign tasks to team members
- Track task status (Todo, In Progress, Done)
- Set task due dates
- Update task information
- Delete completed tasks

### Dashboard
- Real-time project and task statistics
- Task status overview with visual progress bars
- Overdue task tracking
- Recent tasks display
- User welcome personalization

### Team Collaboration
- Add team members to projects
- View team member details
- Track member roles (Admin/Member)
- Member-specific task assignments

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Request validation
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **CSS3** - Styling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud like MongoDB Atlas)
- Git

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create .env file
# Add the following variables:
# MONGO_URI=mongodb://localhost:27017/projectapp
# PORT=5000
# JWT_SECRET=your_secret_key_change_in_production
# NODE_ENV=development

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📚 Project Structure

```
project/
├── Backend/
│   ├── config/              # Configuration files
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── dashboardController.js
│   ├── middleware/          # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/              # API routes
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── dashboardRoutes.js
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
│
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/         # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── styles/          # CSS files
│   │   │   ├── Global.css
│   │   │   ├── Navigation.css
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Projects.css
│   │   │   ├── Tasks.css
│   │   │   └── Home.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
```

## 🔐 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['Admin', 'Member']),
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  title: String (required),
  description: String,
  createdBy: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String (required),
  description: String,
  project: ObjectId (ref: Project, required),
  assignedTo: ObjectId (ref: User),
  status: String (enum: ['Todo', 'In Progress', 'Done']),
  dueDate: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create project (protected)
- `GET /api/projects` - Get all user projects (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `POST /api/projects/:id/members` - Add member to project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Tasks
- `POST /api/tasks` - Create task (protected)
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/project/:projectId` - Get tasks by project (protected)
- `GET /api/tasks/my/tasks` - Get assigned tasks (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Dashboard
- `GET /api/dashboard` - Get dashboard stats (protected)
- `GET /api/dashboard/status/:status` - Get tasks by status (protected)

## 🚀 Deployment to Railway

### Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository with the code

### Steps

#### 1. Backend Deployment
1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select the repository
6. Configure environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `PORT` - Set to any value (Railway assigns a port)
   - `JWT_SECRET` - Your JWT secret key
   - `NODE_ENV` - Set to "production"
   - `FRONTEND_URL` - Your frontend URL on Railway

7. Deploy Backend
8. Note the backend URL provided by Railway

#### 2. Frontend Deployment
1. Update API URL in frontend/src/services/api.js if needed for production
2. Go back to Railway dashboard
3. Create new project for frontend
4. Deploy frontend service
5. Configure environment variables if needed
6. Set custom domain if desired

### Environment Variables for Production

**Backend (.env)**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3000
JWT_SECRET=your_super_secret_key_keep_it_safe
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.railway.app
```

**Frontend (vite.config.js or build variables)**
```
VITE_API_URL=https://your-backend-domain.railway.app
```

## 👤 User Roles

### Admin
- Create and manage projects
- Add/remove team members
- Create and assign tasks
- View all project tasks
- Delete projects and tasks

### Member
- View assigned projects
- View assigned tasks
- Update task status
- Create tasks (if added to project)
- View project members

## 🧪 Testing

### Test User Credentials (Development)
```
Email: test@example.com
Password: test123
```

### Manual Testing Checklist
- [ ] User can sign up
- [ ] User can log in
- [ ] User can create a project
- [ ] User can add members to project
- [ ] User can create tasks
- [ ] User can assign tasks
- [ ] User can update task status
- [ ] Dashboard displays correct stats
- [ ] Overdue tasks are highlighted
- [ ] User can logout
- [ ] Protected routes are working

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your cloud connection string
- Verify firewall rules for MongoDB Atlas

### CORS Error
- Check that both backend and frontend URLs are correct
- Ensure CORS middleware is properly configured

### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration
- Verify JWT_SECRET matches on both signup and login

### Port Already in Use
- Change PORT in .env file
- Kill process using the port: `lsof -ti:5000 | xargs kill -9`

## 📝 Validation Rules

### User Registration
- Name: Required, non-empty
- Email: Required, valid email format, unique
- Password: Required, minimum 6 characters

### Project Creation
- Title: Required, non-empty
- Description: Optional
- At least one member (creator) required

### Task Creation
- Title: Required, non-empty
- Project ID: Required, valid project
- Assigned User: Optional, must be project member
- Due Date: Optional, any future date

## 🤝 Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API endpoints documentation
3. Open an issue on GitHub

## 🎯 Future Enhancements

- [ ] Email notifications for task assignments
- [ ] Task comments and activity logs
- [ ] File attachments for tasks
- [ ] Advanced filtering and search
- [ ] Recurring tasks
- [ ] Task priorities
- [ ] Team calendar view
- [ ] Export project reports
- [ ] Mobile application
- [ ] Real-time collaboration with WebSockets

---

**Made with ❤️ by ProjectHub Team**
