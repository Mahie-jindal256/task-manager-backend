# 📱 Quick Start Guide - ProjectHub

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js installed (https://nodejs.org)
- MongoDB running (or MongoDB Atlas account)
- Git

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd project

# 2. Setup Backend
cd Backend
npm install

# 3. Create .env file
echo "MONGO_URI=mongodb://localhost:27017/projectapp" > .env
echo "PORT=5000" >> .env
echo "JWT_SECRET=dev_secret_key_change_in_production" >> .env
echo "NODE_ENV=development" >> .env

# 4. Start Backend
npm run dev

# 5. Setup Frontend (in new terminal)
cd Frontend
npm install
npm run dev
```

## 🎯 First Steps

1. **Open Browser:** http://localhost:5174

2. **Create Account:**
   - Click "Sign Up"
   - Enter name, email, password
   - Click "Sign Up"

3. **Login:**
   - Use your credentials
   - You'll be redirected to Dashboard

4. **Create Project:**
   - Click "Projects" in navigation
   - Click "+ New Project"
   - Enter project details
   - Click "Create Project"

5. **Create Task:**
   - In Projects view, click "View Project"
   - Create tasks within the project
   - Assign to team members
   - Track progress

## 📊 Dashboard Features

- **Total Projects:** Number of projects you're part of
- **Total Tasks:** All tasks assigned to you
- **Completed:** Tasks with status "Done"
- **In Progress:** Currently working on
- **Overdue:** Tasks past due date

## 👥 Team Collaboration

### Add Team Members
1. Open a project
2. Click "Add Member"
3. Enter team member's email
4. Click "Add"

### Assign Tasks
1. Create a task
2. Select "Assigned To"
3. Choose team member
4. Task appears in their task list

## 🔄 Task Workflow

**Status Transitions:**
- **Todo** → Start working
- **In Progress** → When actively working
- **Done** → When completed

## 🔐 User Roles

- **Admin/Creator:** Full project control
- **Member:** Can work on assigned tasks

## 🆘 Common Issues

### "MongoDB Connected" not showing
- Ensure MongoDB is running
- Check connection string in .env
- Try: `mongod` command (if MongoDB installed locally)

### Port 5000/5173 already in use
- Change PORT in .env
- Or kill the process using the port

### CORS Error
- Ensure both backend and frontend are running
- Check API URL in services/api.js

## 💡 Tips

1. Use descriptive project names
2. Add due dates to tasks
3. Regular status updates help tracking
4. Add all team members upfront
5. Create tasks before project starts

## 🚀 Ready to Deploy?

See `DEPLOYMENT_GUIDE.md` for Railway deployment instructions

---

**Enjoy using ProjectHub! 🎉**
