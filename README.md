# Uber_Clone

## API Endpoints

### POST /users/register

**Description:**  
This endpoint is used to register a new user.

**Request Body:**  
The following fields are required in the request body:
- `fullname.firstname` (string, minimum 3 characters) - The first name of the user.
- `fullname.lastname` (string, minimum 3 characters) - The last name of the user.
- `email` (string, valid email format) - The email address of the user.
- `password` (string, minimum 6 characters) - The password for the user account.

**Response Status Codes:**
- `201 Created` - User registered successfully. Returns the user object and an authentication token.
- `422 Unprocessable Entity` - Validation errors in the request body. Returns an array of error messages.
- `500 Internal Server Error` - Server error during user registration.

**Example Request:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Example Successful Response:**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "64f1c2e9b5d6c9a1e2f3g4h5",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### POST /users/login

**Description:**  
This endpoint is used to log in an existing user.

**Request Body:**  
The following fields are required in the request body:
- `email` (string, valid email format) - The email address of the user.
- `password` (string, minimum 6 characters) - The password for the user account.

**Response Status Codes:**
- `200 OK` - User logged in successfully. Returns the user object and an authentication token.
- `401 Unauthorized` - Invalid email or password.
- `422 Unprocessable Entity` - Validation errors in the request body. Returns an array of error messages.
- `500 Internal Server Error` - Server error during user login.

**Example Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Example Successful Response:**
```json
{
  "success": true,
  "status": "200",
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "64f1c2e9b5d6c9a1e2f3g4h5",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### GET /users/profile

**Description:**  
This endpoint is used to retrieve the profile of the currently authenticated user.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Response Status Codes:**
- `200 OK` - User profile retrieved successfully. Returns the user object.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during profile retrieval.

**Example Request:**  
Headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example Successful Response:**
```json
{
  "_id": "64f1c2e9b5d6c9a1e2f3g4h5",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

---

### GET /users/logout

**Description:**  
This endpoint is used to log out the currently authenticated user. The JWT token used for authentication is blacklisted, ensuring it cannot be reused.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Response Status Codes:**
- `200 OK` - User logged out successfully.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during logout.

**Blacklist Functionality:**  
When a user logs out, their JWT token is added to a blacklist stored in the database. The token is set to expire automatically after 24 hours (TTL). During authentication, any token found in the blacklist is considered invalid, preventing unauthorized reuse of tokens.

**Example Request:**  
Headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Example Successful Response:**
```json
{
  "success": true,
  "status": "200",
  "message": "User logged out successfully"
}
```