# API Base URL Configuration

## Overview

This project now uses environment variables for API URLs to make deployment to different environments easier. The hardcoded URLs (`http://localhost:5176`) have been replaced with a `BASE_URL` variable imported from a configuration file.

## Files Updated

Several files have been updated to use the new BASE_URL configuration:

1. `src/config/apiConfig.js` - Contains the BASE_URL export
2. `src/pages/Dishes/Dishes.jsx`
3. `src/models/AddTableModel.jsx`
4. `src/models/UpdateDishModel.jsx`
5. `src/pages/User/MyBookings.jsx`
6. `src/pages/Tables/AvailableTables.jsx`
7. `src/pages/Home/Categories.jsx`

## How It Works

1. The `.env` file contains the API base URL for development:
   ```
   VITE_API_BASE_URL=http://localhost:5176
   ```

2. The `apiConfig.js` exports this value:
   ```javascript
   export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
   ```

3. Components import and use this value:
   ```javascript
   import { BASE_URL } from "../config/apiConfig";
   
   // Example usage
   fetch(`${BASE_URL}/api/endpoint`);
   ```

## Deployment

When deploying to production:

1. Create a `.env.production` file with your production API URL:
   ```
   VITE_API_BASE_URL=https://your-production-api.com
   ```

2. Build the project with:
   ```
   npm run build
   ```

## Remaining Files to Update

Some files may still contain hardcoded URLs. To update them:

1. Import the BASE_URL:
   ```javascript
   import { BASE_URL } from "../config/apiConfig";
   ```

2. Replace hardcoded URLs:
   ```javascript
   // From
   fetch("http://localhost:5176/api/endpoint")
   
   // To
   fetch(`${BASE_URL}/api/endpoint`)
   ```

You can find remaining instances with:
```
grep -r "http://localhost:5176" src/
```
