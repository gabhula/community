// API Configuration
// This file manages the backend API URL for both development and production

const CONFIG = {
    // ⚠️ IMPORTANT: UPDATE THIS WITH YOUR DEPLOYED BACKEND URL ⚠️
    PRODUCTION_API_URL: 'https://web-production-4a4e.up.railway.app', // ← CHANGE THIS TO YOUR BACKEND URL
    
    // Examples of backend URLs:
    // Heroku: 'https://your-app-name.herokuapp.com'
    // Railway: 'https://your-app-name.railway.app'
    // Render: 'https://your-app-name.onrender.com'
    // Vercel: 'https://your-app-name.vercel.app'
    // Custom: 'https://api.yourdomain.com'
    
    // Development API URL
    DEVELOPMENT_API_URL: 'http://localhost:3000',
    
    // Auto-detect environment
    isDevelopment: function() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('localhost');
    },
    
    // Get the appropriate API URL
    getApiUrl: function() {
        // Check if a custom API URL is set in localStorage (for testing)
        const customUrl = localStorage.getItem('API_URL');
        if (customUrl) {
            console.log('Using custom API URL:', customUrl);
            return customUrl;
        }
        
        // Check for environment variable or URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const apiUrl = urlParams.get('api_url');
        if (apiUrl) {
            console.log('Using API URL from parameter:', apiUrl);
            return apiUrl;
        }
        
        // Auto-detect based on current location
        if (this.isDevelopment()) {
            console.log('Development mode - using local API');
            return this.DEVELOPMENT_API_URL;
        } else {
            console.log('Production mode - using production API');
            return this.PRODUCTION_API_URL;
        }
    },
    
    // Set custom API URL (useful for testing)
    setApiUrl: function(url) {
        localStorage.setItem('API_URL', url);
        console.log('API URL set to:', url);
    },
    
    // Clear custom API URL
    clearApiUrl: function() {
        localStorage.removeItem('API_URL');
        console.log('Custom API URL cleared');
    }
};

// Make it globally available
window.API_CONFIG = CONFIG;

// Log current configuration
console.log('API Configuration loaded');
console.log('Current API URL:', CONFIG.getApiUrl());

// Helper function to display API URL in UI
function displayApiUrl() {
    const elements = document.querySelectorAll('.api-url-display');
    elements.forEach(el => {
        el.textContent = CONFIG.getApiUrl();
    });
}

// Allow setting API URL via console for debugging
window.setApiUrl = CONFIG.setApiUrl.bind(CONFIG);
window.clearApiUrl = CONFIG.clearApiUrl.bind(CONFIG);

// Instructions for deployment
console.log(`
===========================================
DEPLOYMENT INSTRUCTIONS:
===========================================
1. Update PRODUCTION_API_URL in config.js with your deployed backend URL
2. Examples:
   - Heroku: https://your-app.herokuapp.com
   - Railway: https://your-app.railway.app
   - Render: https://your-app.onrender.com
   
3. For testing different APIs:
   - Use URL parameter: ?api_url=https://your-api.com
   - Or in console: setApiUrl('https://your-api.com')
   - Clear custom: clearApiUrl()
===========================================
`);