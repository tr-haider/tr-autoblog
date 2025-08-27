# 🚀 Deploying AutoBlog AI to Vercel

This guide covers deploying your full-stack AutoBlog AI application to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Prepare your API keys and configuration

## 🛠️ Deployment Steps

### Step 1: Prepare Your Code

1. **Ensure all files are committed to GitHub:**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Build configuration is ready** (already done):
   - ✅ `vercel.json` configured
   - ✅ `autoblog-api/` serverless function created
   - ✅ Frontend environment variables configured

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build:frontend`
   - **Output Directory**: `blog-ui/build`
   - **Install Command**: `npm run install:all`

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? autoblog-ai
# - In which directory is your code located? ./
```

### Step 3: Environment Variables

Add these environment variables in Vercel Dashboard:

#### Required Variables:
```bash
# LLM Configuration
LLM_PROVIDER=groq
LLM_API_KEY=your_groq_api_key_here
LLM_MODEL=llama-3.1-8b-instant

# Frontend API URL
REACT_APP_API_BASE=https://your-app-name.vercel.app/api
```

#### Optional Variables (if using email features):
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MARKETING_EMAIL=marketing@yourcompany.com
```

### Step 4: Configure Domains (Optional)

1. **Custom Domain** (if you have one):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update `REACT_APP_API_BASE` to use your domain

2. **Vercel Domain**:
   - Use the provided `.vercel.app` domain
   - Update `REACT_APP_API_BASE` accordingly

## 🔧 Configuration Files Explained

### `vercel.json`
```json
{
  "version": 2,
  "name": "autoblog-ai",
  "buildCommand": "npm run build:frontend",
  "outputDirectory": "blog-ui/build",
  "framework": "create-react-app",
  "functions": {
    "autoblog-api/index.js": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/autoblog-api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### URL Structure After Deployment
- **Frontend**: `https://your-app.vercel.app/`
- **Backend API**: `https://your-app.vercel.app/api/`
- **Blog Generator**: `https://your-app.vercel.app/api/blog-generator/generate`
- **Suggested Topics**: `https://your-app.vercel.app/api/blog-generator/suggested-topics`

## ⚡ Performance Considerations

### Serverless Function Limits
- **Execution Time**: 10 seconds (Hobby), 30 seconds (Pro)
- **Memory**: 1GB max
- **Bundle Size**: 50MB max

### LLM API Considerations
- Use **GROQ** (fastest) for production
- Consider caching for topic suggestions
- Implement request timeouts

### Frontend Optimizations
- Static files served from CDN
- Automatic compression
- React build optimizations included

## 🐛 Troubleshooting

### Common Issues:

#### 1. **Build Failures**
```bash
# If build fails, check dependencies
npm run install:all
npm run build:frontend
```

#### 2. **API Not Working**
- Verify environment variables are set
- Check function logs in Vercel dashboard
- Ensure `REACT_APP_API_BASE` points to correct URL

#### 3. **CORS Issues**
- CORS is configured in `autoblog-api/index.js`
- If issues persist, check browser network tab

#### 4. **Timeout Errors**
- LLM generation might exceed serverless limits
- Consider reducing `targetWordCount`
- Implement request queuing for large requests

### Debugging Steps:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Functions
   - View real-time logs for errors

2. **Test API Endpoints:**
```bash
# Test API directly
curl https://your-app.vercel.app/api/blog-generator/suggested-topics

# Test with browser
https://your-app.vercel.app/api/blog-generator/suggested-topics
```

3. **Local Testing:**
```bash
# Test production build locally
npm run build:frontend
cd blog-ui/build && python -m http.server 3000
```

## 🔒 Security Best Practices

1. **Environment Variables:**
   - Never commit API keys to GitHub
   - Use Vercel's environment variable system
   - Set different keys for development/production

2. **API Security:**
   - CORS properly configured
   - Input validation in place
   - Rate limiting (consider implementing)

3. **Domain Security:**
   - Use HTTPS (automatic with Vercel)
   - Configure proper headers

## 📊 Monitoring & Analytics

### Vercel Analytics
- Enable Web Analytics in project settings
- Monitor Core Web Vitals
- Track page performance

### Function Monitoring
- Monitor function execution time
- Track error rates
- Set up alerts for failures

## 🚀 Post-Deployment

### 1. Test All Features
- [ ] Topic generation and refresh
- [ ] Blog generation with different parameters
- [ ] Resource link selection
- [ ] DOCX/HTML downloads
- [ ] Copy functionality

### 2. Performance Testing
- [ ] Test LLM response times
- [ ] Check file download speeds
- [ ] Verify mobile responsiveness

### 3. Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error alerts
- [ ] Monitor function execution times

## 🔄 Continuous Deployment

Once connected to GitHub:
1. **Automatic Deployments**: Every push to main branch deploys automatically
2. **Preview Deployments**: Pull requests get preview URLs
3. **Rollback**: Easy rollback to previous deployments

## 📱 Mobile & PWA (Future Enhancement)

Consider adding PWA features:
```json
// In blog-ui/public/manifest.json
{
  "name": "AutoBlog AI",
  "short_name": "AutoBlog",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1976d2"
}
```

---

## 🎉 You're Live!

After successful deployment:

- **Your App**: `https://your-app-name.vercel.app`
- **Share**: Send the URL to your team
- **Monitor**: Check Vercel dashboard for usage stats

### Next Steps:
1. Test all functionality
2. Share with stakeholders
3. Monitor performance
4. Consider custom domain
5. Set up monitoring alerts

**Need help?** Check Vercel docs or create an issue in your repository.
