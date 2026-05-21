# 🚀 Deployment Guide - ProjectHub on Railway

## Step-by-Step Railway Deployment

### Prerequisites
- Railway account (https://railway.app)
- GitHub account with the repository pushed
- Backend and Frontend source code ready

---

## Part 1: Backend Deployment

### 1. Prepare Backend for Deployment

**Update Backend/.env for production:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=3000
JWT_SECRET=your_super_secret_key_here
NODE_ENV=production
FRONTEND_URL=https://your-frontend-railway-url.railway.app
```

### 2. Connect to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub and select your repository

### 3. Configure Backend Service

1. In Railway, click "Add Service"
2. Select "GitHub Repo"
3. Choose the repository
4. Configure the following:
   - **Root Directory:** `Backend/`
   - **Build Command:** `npm install`
   - **Start Command:** `npm run start` or `node server.js`

### 4. Set Environment Variables

In Railway dashboard for Backend service:
1. Click on "Variables"
2. Add the following variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/projectapp
   JWT_SECRET=your_production_secret_key
   NODE_ENV=production
   PORT=3000
   ```

### 5. Deploy Backend

1. Click "Deploy" button
2. Wait for build to complete (typically 2-3 minutes)
3. Once deployed, note the backend URL (e.g., `https://projecthub-api.railway.app`)

---

## Part 2: Frontend Deployment

### 1. Update Frontend for Production

**Update Frontend/vite.config.js:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path
      }
    }
  }
})
```

**Update Frontend/src/services/api.js:**
```javascript
const API = axios.create({
    baseURL: process.env.VITE_API_URL + '/api' || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})
```

### 2. Deploy Frontend

1. In Railway, click "Add Service"
2. Select "GitHub Repo"
3. Choose your repository
4. Configure:
   - **Root Directory:** `Frontend/`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run preview` (or use Nitro for Node.js hosting)

### 3. Set Environment Variables

For Frontend service in Railway:
```
VITE_API_URL=https://your-backend-railway-url.railway.app
```

### 4. Configure Domain

1. In Railway, go to Frontend service
2. Click "Settings"
3. Under "Public URL", you can:
   - Use the default Railway URL
   - Add a custom domain

---

## Part 3: Post-Deployment Checklist

### Verify Backend
- [ ] Backend URL is accessible
- [ ] API test: Visit `https://your-backend-url/` (should show "API Running")
- [ ] Database connection is working
- [ ] Environment variables are set correctly

### Verify Frontend
- [ ] Frontend URL is accessible
- [ ] Page loads without errors
- [ ] Can navigate to login page
- [ ] API calls reach backend correctly

### Test Full Application
1. **Signup:**
   - Create a new account
   - Verify token is saved in localStorage

2. **Login:**
   - Login with created account
   - Should redirect to dashboard

3. **Create Project:**
   - Click "New Project"
   - Create a test project
   - Should appear in projects list

4. **Create Task:**
   - Open a project
   - Create a test task
   - Should appear in tasks list

5. **Dashboard:**
   - Check statistics display
   - Verify all numbers are correct

---

## Troubleshooting Deployment Issues

### Backend Build Fails
**Error:** `npm: command not found`
- Solution: Ensure Node.js is installed in Railway environment
- Add `engines` in package.json:
  ```json
  "engines": {
    "node": "18.x"
  }
  ```

### MongoDB Connection Error
**Error:** `MongoServerError: connect ECONNREFUSED`
- Solution: Check MONGO_URI variable
- Ensure IP whitelist allows Railway IPs (use 0.0.0.0/0 for testing)

### CORS Errors
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`
- Solution: Update server.js CORS configuration:
  ```javascript
  app.use(cors({
    origin: 'https://your-frontend-url.railway.app',
    credentials: true
  }))
  ```

### Frontend Not Connecting to Backend
**Error:** `404 Not Found` on API calls
- Solution: Verify API URL in frontend environment variables
- Check that backend URL doesn't have trailing slash
- Example: `https://projecthub-api.railway.app` (not `.../`)

### Build Timeout
**Error:** `Build timed out after 30 minutes`
- Solution: Optimize dependencies
- Remove unnecessary packages
- Check for circular dependencies

---

## Environment Variables Reference

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=use_a_strong_random_string_here
NODE_ENV=production
FRONTEND_URL=https://your-frontend.railway.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.railway.app
VITE_APP_NAME=ProjectHub
```

---

## Securing Your Application

### 1. JWT Secret
- Use a strong, random JWT secret
- Never use the same secret for development and production
- Generate using: `openssl rand -base64 32`

### 2. MongoDB Security
- Enable password authentication
- Use IP whitelisting
- Change default credentials
- Enable encryption at rest

### 3. CORS Configuration
- Restrict origins to your frontend domain
- Use environment variables for URLs
- Never use wildcard (*) in production

### 4. HTTPS
- Railway automatically provides HTTPS
- All communications are encrypted
- No additional setup needed

---

## Monitoring and Maintenance

### View Logs
1. Click on service in Railway dashboard
2. Go to "Logs" tab
3. View real-time application logs

### Monitor Performance
1. Use "Metrics" tab to monitor:
   - CPU usage
   - Memory usage
   - Network traffic
   - Response times

### Updates
- Keep Node.js dependencies updated
- Regularly update to latest stable versions
- Test updates in development first

---

## Rolling Back Deployment

If you need to revert to a previous version:
1. In Railway, go to Deployments
2. Click on a previous deployment
3. Click "Redeploy"

---

## Cost Optimization

### Railway Pricing
- Free tier includes $5/month credit
- Pay-as-you-go after that
- Typical hobby projects: $5-20/month

### Optimization Tips
- Use MongoDB Atlas free tier for development
- Optimize database queries
- Enable caching where applicable
- Monitor unused resources

---

## Next Steps

1. Test all features thoroughly
2. Set up monitoring and alerting
3. Create a backup strategy
4. Document any custom configurations
5. Set up CI/CD pipeline for automatic deployments

---

## Support Resources

- Railway Documentation: https://docs.railway.app
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Node.js: https://nodejs.org
- React: https://react.dev

---

**Happy Deploying! 🚀**
