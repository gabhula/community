# Deployment Configuration Guide

## Quick Fix for Production API URL

When you deploy your application, the frontend needs to know where your backend API is hosted. Follow these steps:

## Step 1: Find Your Backend URL

Your backend URL depends on where you deployed it:
- **Heroku**: `https://your-app-name.herokuapp.com`
- **Railway**: `https://your-app-name.railway.app`
- **Render**: `https://your-app-name.onrender.com`
- **Vercel**: `https://your-app-name.vercel.app`
- **Custom Domain**: `https://api.yourdomain.com`

## Step 2: Update config.js

Open `config.js` in the `aria-assistant-ui` folder and update line 5:

```javascript
// BEFORE:
PRODUCTION_API_URL: 'https://your-backend-app.herokuapp.com',

// AFTER (example with Railway):
PRODUCTION_API_URL: 'https://web-production-4a4e.up.railway.app',
```

## Step 3: Deploy Frontend

Deploy your frontend files (`aria-assistant-ui` folder) to your hosting service.

## That's It! 🎉

The application will now automatically:
- Use `http://localhost:3000` when running locally
- Use your production URL when deployed

## Testing Different APIs

### Method 1: URL Parameter (Temporary)
Add `?api_url=` to your website URL:
```
https://yoursite.com/admin.html?api_url=https://test-api.com
```

### Method 2: Browser Console (Temporary)
Open browser console (F12) and type:
```javascript
setApiUrl('https://your-test-api.com')
```

To clear custom URL:
```javascript
clearApiUrl()
```

## How It Works

The `config.js` file automatically detects:
1. **Local Development**: Uses `http://localhost:3000`
2. **Production**: Uses the URL you configured
3. **Custom Override**: Uses URL from parameter or localStorage

## Troubleshooting

### Check Current API URL
Open browser console (F12) and look for:
```
📍 ARIA API URL: https://your-api.com
```

### API Connection Issues
1. Check if backend is running
2. Verify CORS is enabled on backend
3. Ensure HTTPS for production
4. Check browser console for errors

### Common Issues

**Issue**: "Failed to fetch" errors
**Solution**: Backend URL is incorrect or backend is not running

**Issue**: CORS errors
**Solution**: Backend needs to allow your frontend domain

**Issue**: Still using localhost in production
**Solution**: Clear browser cache and reload

## Backend Configuration

Make sure your backend (`server.js`) has CORS enabled:
```javascript
app.use(cors()); // This allows all origins
```

For production, specify allowed origins:
```javascript
app.use(cors({
    origin: ['https://yourfrontend.com', 'http://localhost:3000']
}));
```

## Environment Variables (Backend)

Set these on your backend hosting platform:
```
NOWPAYMENTS_API_KEY=your_api_key
NOWPAYMENTS_IPN_SECRET=your_secret
NODE_ENV=production
PORT=3000
```

## Files Structure

```
aria-assistant-ui/
├── config.js          # ← UPDATE THIS FILE
├── index.html         # Main app (uses config.js)
├── admin.html         # Admin panel (uses config.js)
└── DEPLOYMENT_GUIDE.md # This file

aria-assistant/
├── server.js          # Backend API
├── package.json       # Dependencies
└── tickets.sql        # Database schema
```

## Quick Checklist

- [ ] Update `PRODUCTION_API_URL` in config.js
- [ ] Deploy backend to hosting service
- [ ] Set environment variables on backend
- [ ] Deploy frontend to hosting service
- [ ] Test the connection
- [ ] Check admin panel works

## Support

If you're still having issues:
1. Check browser console for errors
2. Verify backend is accessible: `https://your-api.com/`
3. Test API directly: `https://your-api.com/api/admin/dashboard`