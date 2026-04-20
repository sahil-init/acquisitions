# Authentication API Usage Examples

This document provides comprehensive examples for using the Acquisitions API authentication endpoints.

## Base URL
```
http://localhost:3000/api/auth
```

## 1. Sign Up (User Registration)

### Endpoint
```
POST /api/auth/sign-up
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "user"
}
```

### Field Requirements
- **name** (string, required): 2-255 characters
- **email** (string, required): Valid email format, max 255 characters, must be unique
- **password** (string, required): 6-128 characters
- **role** (enum, optional): Either `"user"` or `"admin"`, defaults to `"user"`

### Success Response (201 Created)
```json
{
  "message": "User registered",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

Response Headers:
```
Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Strict; Max-Age=900; Path=/
```

### Error Response - Validation Failed (400 Bad Request)
```json
{
  "error": "Validation failed",
  "details": "String must contain at least 2 character(s), Invalid email"
}
```

### Error Response - Email Already Exists (409 Conflict)
```json
{
  "error": "Email already exists"
}
```

### cURL Example
```bash
curl -X POST http://localhost:3000/api/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123",
    "role": "user"
  }' \
  -c cookies.txt
```

### JavaScript/Fetch Example
```javascript
const signupResponse = await fetch('http://localhost:3000/api/auth/sign-up', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies in the request
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123',
    role: 'user',
  }),
});

const data = await signupResponse.json();
console.log(data);
// Output:
// {
//   "message": "User registered",
//   "user": {
//     "id": 1,
//     "name": "John Doe",
//     "email": "john@example.com",
//     "role": "user"
//   }
// }
```

### Node.js/Axios Example
```javascript
import axios from 'axios';

const signupResponse = await axios.post(
  'http://localhost:3000/api/auth/sign-up',
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123',
    role: 'user',
  },
  {
    withCredentials: true, // Include cookies
  }
);

console.log(signupResponse.data);
// Output:
// {
//   "message": "User registered",
//   "user": {
//     "id": 1,
//     "name": "John Doe",
//     "email": "john@example.com",
//     "role": "user"
//   }
// }
```

---

## 2. Sign In (User Login)

### Endpoint
```
POST /api/auth/sign-in
```

### Request Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

### Field Requirements
- **email** (string, required): Valid email format
- **password** (string, required): At least 1 character (the actual password validation is done via bcrypt comparison)

### Success Response (200 OK)
```json
{
  "message": "User logged in",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

Response Headers:
```
Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; SameSite=Strict; Max-Age=900; Path=/
```

### Error Response - Validation Failed (400 Bad Request)
```json
{
  "error": "Validation failed",
  "details": "Invalid email"
}
```

### Error Response - User Not Found (404 Not Found)
```json
{
  "error": "User not found"
}
```

### Error Response - Invalid Password (401 Unauthorized)
```json
{
  "error": "Invalid password"
}
```

### cURL Example
```bash
curl -X POST http://localhost:3000/api/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }' \
  -c cookies.txt
```

### JavaScript/Fetch Example
```javascript
const signinResponse = await fetch('http://localhost:3000/api/auth/sign-in', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePassword123',
  }),
});

const data = await signinResponse.json();

if (signinResponse.ok) {
  console.log('Login successful:', data.user);
} else {
  console.error('Login failed:', data.error);
}
```

### Node.js/Axios Example
```javascript
import axios from 'axios';

try {
  const signinResponse = await axios.post(
    'http://localhost:3000/api/auth/sign-in',
    {
      email: 'john@example.com',
      password: 'SecurePassword123',
    },
    {
      withCredentials: true,
    }
  );

  console.log('Login successful:', signinResponse.data.user);
} catch (error) {
  if (error.response?.status === 404) {
    console.error('User not found');
  } else if (error.response?.status === 401) {
    console.error('Invalid password');
  } else {
    console.error('Login error:', error.response?.data?.error);
  }
}
```

---

## 3. Sign Out (User Logout)

### Endpoint
```
POST /api/auth/sign-out
```

### Request Headers
```
Content-Type: application/json
(No body required)
```

### Request Body
None (or empty object `{}`)

### Success Response (200 OK)
```json
{
  "message": "User logged out"
}
```

Response Headers:
```
Set-Cookie: token=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/
```

### Error Response - Server Error (500 Internal Server Error)
```json
{
  "error": "Internal server error"
}
```

### cURL Example
```bash
curl -X POST http://localhost:3000/api/auth/sign-out \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -c cookies.txt
```

### JavaScript/Fetch Example
```javascript
const signoutResponse = await fetch('http://localhost:3000/api/auth/sign-out', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Include cookies
});

const data = await signoutResponse.json();
console.log(data.message); // "User logged out"
```

### Node.js/Axios Example
```javascript
import axios from 'axios';

try {
  const signoutResponse = await axios.post(
    'http://localhost:3000/api/auth/sign-out',
    {},
    {
      withCredentials: true,
    }
  );

  console.log('Logout successful:', signoutResponse.data.message);
} catch (error) {
  console.error('Logout error:', error.message);
}
```

---

## Complete Workflow Example

### JavaScript/Fetch - Full Authentication Flow
```javascript
// 1. Sign Up
async function signup() {
  const signupRes = await fetch('http://localhost:3000/api/auth/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'MyPassword456',
      role: 'user',
    }),
  });
  
  if (!signupRes.ok) {
    console.error('Signup failed');
    return null;
  }
  
  const { user } = await signupRes.json();
  console.log('✓ Signup successful:', user);
  return user;
}

// 2. Sign In
async function signin(email, password) {
  const signinRes = await fetch('http://localhost:3000/api/auth/sign-in', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  
  if (!signinRes.ok) {
    console.error('Sign-in failed');
    return null;
  }
  
  const { user } = await signinRes.json();
  console.log('✓ Sign-in successful:', user);
  return user;
}

// 3. Sign Out
async function signout() {
  const signoutRes = await fetch('http://localhost:3000/api/auth/sign-out', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  
  if (!signoutRes.ok) {
    console.error('Sign-out failed');
    return false;
  }
  
  console.log('✓ Sign-out successful');
  return true;
}

// Execute workflow
(async () => {
  // Register new user
  const newUser = await signup();
  if (!newUser) return;
  
  // Simulate logging out and back in
  await signout();
  
  // Sign back in with the same credentials
  const loggedInUser = await signin('jane@example.com', 'MyPassword456');
  if (!loggedInUser) return;
  
  // Logout when done
  await signout();
})();
```

---

## Testing the API Locally

### Start the Development Server
```bash
npm run dev
```

### Health Check
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2026-04-20T08:00:00.000Z",
  "uptime": 45.123
}
```

### API Status
```bash
curl http://localhost:3000/api
```

Response:
```json
{
  "message": "Acquisitions API is running!"
}
```

---

## Common Issues & Troubleshooting

### Issue: "Email already exists"
**Cause:** The email is already registered in the database.
**Solution:** Use a different email address or delete the user from the database.

### Issue: "Invalid password" on sign-in
**Cause:** The password doesn't match the hashed password in the database.
**Solution:** Ensure you're using the exact password from signup. Passwords are case-sensitive.

### Issue: "User not found" on sign-in
**Cause:** No user with that email exists in the database.
**Solution:** Sign up first, or check that the email is spelled correctly.

### Issue: Cookie not being set
**Cause:** Missing `credentials: 'include'` in Fetch or `withCredentials: true` in Axios.
**Solution:** Ensure you're including credentials in your requests to receive cookies.

### Issue: CORS error
**Cause:** CORS is enabled but your frontend is on a different origin.
**Solution:** The API currently allows all origins via CORS. If getting errors, check browser console for details.

---

## Security Notes

- **Passwords** are hashed with bcrypt (salt rounds: 10) before storage. Never log or expose plain passwords.
- **JWT tokens** expire in 1 day. Implement token refresh logic if needed.
- **Cookies** are set as HTTP-only and SameSite=strict. They cannot be accessed via JavaScript (`document.cookie`).
- **In production**, ensure `NODE_ENV=production` so cookies have the `secure` flag (HTTPS only).
- Always use HTTPS in production.
- Change the `JWT_SECRET` environment variable from the default.
