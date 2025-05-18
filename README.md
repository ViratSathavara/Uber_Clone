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

---

### POST /captain/register

**Description:**  
This endpoint is used to register a new captain (driver) along with their vehicle details.

**Request Body:**  
The following fields are required in the request body:
- `fullname.firstname` (string, minimum 3 characters) - The first name of the captain.
- `fullname.lastname` (string, minimum 3 characters) - The last name of the captain.
- `email` (string, valid email format) - The email address of the captain.
- `password` (string, minimum 6 characters) - The password for the captain account.
- `vehicle.color` (string, minimum 3 characters) - The color of the vehicle.
- `vehicle.plate` (string, minimum 3 characters) - The license plate of the vehicle.
- `vehicle.capacity` (integer, minimum 1) - The seating capacity of the vehicle.
- `vehicle.vehicleType` (string, one of `car`, `auto`, `bike`) - The type of the vehicle.

**Response Status Codes:**
- `201 Created` - Captain registered successfully. Returns the captain object and an authentication token.
- `400 Bad Request` - Validation errors in the request body or captain already exists. Returns an array of error messages.
- `500 Internal Server Error` - Server error during captain registration.

**Example Request:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Successful Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f1c2e9b5d6c9a1e2f3g4h5",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

---

### POST /captain/login

**Description:**  
This endpoint is used to log in an existing captain (driver).

**Request Body:**  
The following fields are required in the request body:
- `email` (string, valid email format) - The email address of the captain.
- `password` (string, minimum 6 characters) - The password for the captain account.

**Response Status Codes:**
- `200 OK` - Captain logged in successfully. Returns the captain object and an authentication token.
- `401 Unauthorized` - Invalid email or password.
- `422 Unprocessable Entity` - Validation errors in the request body. Returns an array of error messages.
- `500 Internal Server Error` - Server error during captain login.

**Example Request:**
```json
{
  "email": "jane.doe@example.com",
  "password": "securepassword123"
}
```

**Example Successful Response:**
```json
{
  "success": true,
  "status": "200",
  "message": "Captain logged in successfully",
  "data": {
    "captain": {
      "_id": "64f1c2e9b5d6c9a1e2f3g4h5",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### GET /captain/profile

**Description:**  
This endpoint is used to retrieve the profile of the currently authenticated captain (driver).

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for captain authentication.

**Response Status Codes:**
- `200 OK` - Captain profile retrieved successfully. Returns the captain object.
- `401 Unauthorized` - Captain is not authenticated or token is invalid.
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
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "status": "inactive",
  "socketId": null
}
```

---

### GET /captain/logout

**Description:**  
This endpoint is used to log out the currently authenticated captain (driver). The JWT token used for authentication is blacklisted, ensuring it cannot be reused.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for captain authentication.

**Response Status Codes:**
- `200 OK` - Captain logged out successfully.
- `401 Unauthorized` - Captain is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during logout.

**Blacklist Functionality:**  
When a captain logs out, their JWT token is added to a blacklist stored in the database. The token is set to expire automatically after 24 hours (TTL). During authentication, any token found in the blacklist is considered invalid, preventing unauthorized reuse of tokens.

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
  "message": "Captain logged out successfully"
}
```

ViratSathavara: in this file i want 4 fields for 
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  

  these 4 states 

  before password field, for color i want color picketr for choose color,
  after then i want plate textfield ,after then capacity of vehicle with dropdown 1, 2, 3, 4, 5, 6, and 7 
  and after then for vehicletype also want dropown as a car, bike or auto 

GitHub Copilot: To add the requested fields for `color`, `plate`, `capacity`, and `vehicleType` before the password field, you can modify the JSX as follows:

```jsx
...
<div className="w-full">
  <label
    htmlFor="color"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Choose Vehicle Color
  </label>
  <input
    id="color"
    type="color"
    value={color}
    onChange={(e) => setColor(e.target.value)}
    className="w-full h-10 rounded-lg border border-gray-300"
    required
  />
</div>

<div className="w-full">
  <label
    htmlFor="plate"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Enter Vehicle Plate Number
  </label>
  <TextField
    id="plate"
    type="text"
    value={plate}
    onChange={(e) => setPlate(e.target.value)}
    placeholder="Plate Number"
    variant="outlined"
    required
    fullWidth
    InputProps={{
      className: "rounded-lg bg-gray-50",
    }}
    InputLabelProps={{
      className: "text-gray-500",
    }}
  />
</div>

<div className="w-full">
  <label
    htmlFor="capacity"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Capacity
  </label>
  <select
    id="capacity"
    value={capacity}
    onChange={(e) => setCapacity(e.target.value)}
    className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
    required
  >
    <option value="" disabled>Select Capacity</option>
    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>

<div className="w-full">
  <label
    htmlFor="vehicleType"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Type
  </label>
  <select
    id="vehicleType"
    value={vehicleType}
    onChange={(e) => setVehicleType(e.target.value)}
    className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
    required
  >
    <option value="" disabled>Select Vehicle Type</option>
    {["Car", "Bike", "Auto"].map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>
...
```

### Explanation:
1. **Color Picker**: Added an `<input>` of type `color` for selecting the vehicle color.
2. **Plate Field**: Added a `TextField` for entering the vehicle plate number.
3. **Capacity Dropdown**: Added a `<select>` element with options for vehicle capacity ranging from 1 to 7.
4. **Vehicle Type Dropdown**: Added another `<select>` element with options for vehicle types (`Car`, `Bike`, `Auto`).

Place this code block **before the password field** in your JSX. Let me know if you need further adjustments!

ViratSathavara: import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setColor('');
    setPlate('');
    setCapacity('');
    setVehicleType('');
  };

  return (
    <>
      <img
        src="../assets/Uber-Logo.png"
        alt="uber-logo"
        className="w-24 absolute"
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
        >
          <div className="flex flex-col justify-center items-center w-full space-y-4">

<div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Fullname
              </label>
              <div className="flex flex-col gap-5">

              <TextField

                              id="firstname"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Firstname"
                              variant="outlined"
                              required
                              fullWidth
                              InputProps={{
                                className: "rounded-lg bg-gray-50",
                              }}
                              InputLabelProps={{
                                className: "text-gray-500",
                              }}
                                                          <TextField
                              id="lastname"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Lastname"
                              variant="outlined"
                              required
                              fullWidth
                              InputProps={{
                                className: "rounded-lg bg-gray-50",
                              }}
                              InputLabelProps={{
                                className: "text-gray-500",
                              }}
                                                            </div>
                          </div>


            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Email
              </label>
              <TextField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
                InputLabelProps={{
                  className: "text-gray-500",
                }}
                          </div>
<div className="w-full">
  <label
    htmlFor="color"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Choose Vehicle Color
  </label>
  <input
    id="color"
    type="color"
    value={color}
    onChange={(e) => setColor(e.target.value)}
    className="w-full h-10 rounded-lg border border-gray-300"
    required
  </div>

<div className="w-full">
  <label
    htmlFor="plate"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Enter Vehicle Plate Number
  </label>
  <TextField
    id="plate"
    type="text"
    value={plate}
    onChange={(e) => setPlate(e.target.value)}
    placeholder="Plate Number"
    variant="outlined"
    required
    fullWidth
    InputProps={{
      className: "rounded-lg bg-gray-50",
    }}
    InputLabelProps={{
      className: "text-gray-500",
    }}
  </div>

<div className="w-full">
  <label
    htmlFor="capacity"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Capacity
  </label>
  <select
    id="capacity"
    value={capacity}
    onChange={(e) => setCapacity(e.target.value)}
    className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
    required
  >
    <option value="" disabled>Select Capacity</option>
    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
      <option key={num} value={num}>
        {num}
      </option>
    ))}
  </select>
</div>

<div className="w-full">
  <label
    htmlFor="vehicleType"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Type
  </label>
  <select
    id="vehicleType"
    value={vehicleType}
    onChange={(e) => setVehicleType(e.target.value)}
    className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
    required
  >
    <option value="" disabled>Select Vehicle Type</option>
    {["Car", "Bike", "Auto"].map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
</div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Password
              </label>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
                          </div>

            <div className="w-full pt-4">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!py-3 !bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-300"
              >
                Sign In
              </Button>
            </div>

            <div className="text-center flex gap-1 text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you have an account?
              </label>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Signin
                </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CaptainSignup;


complete the all functionality same as Signup page but fields re for captain signup so only check signup flow but code will be update for captainSignup page

GitHub Copilot: I'll fix the syntax errors in your CaptainSignup.jsx and implement the same functionality as the Signup page, while including the captain-specific fields:

```jsx
import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { showSuccessToast, showErrorToast } from '../CommonComponents/Toast';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  
  const { user, setUser } = React.useContext(UserDataContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plateNumber: plate,
        capacity: parseInt(capacity),
        type: vehicleType
      }
    };

    try {
      const response = await axios.post(`http://localhost:4000/captains/register`, newCaptain);
      
      if (response?.status === 201) {
        showSuccessToast('Captain Account Created Successfully...');
        const userData = response?.data;
        setUser(userData?.user)
        localStorage.setItem('token', userData?.data?.token);
        setTimeout(() => navigate('/captain/dashboard'), 1500);
      }

      // Reset form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setColor('');
      setPlate('');
      setCapacity('');
      setVehicleType('');
      
    } catch (error) {
      console.error('Signup error:', error);
      const msg = error.response?.data?.message || 'Something went wrong!';
      showErrorToast(msg);
    }
  };

  return (
    <>
      <img
        src="../assets/Uber-Logo.png"
        alt="uber-logo"
        className="w-24 absolute"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
        >
          <div className="flex flex-col justify-center items-center w-full space-y-4">

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Fullname
              </label>
              <div className="flex flex-col gap-5">
                <TextField
                  id="firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Firstname"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: "rounded-lg bg-gray-50",
                  }}
                  InputLabelProps={{
                    className: "text-gray-500",
                  }}
                />
                <TextField
                  id="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Lastname"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: "rounded-lg bg-gray-50",
                  }}
                  InputLabelProps={{
                    className: "text-gray-500",
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Email
              </label>
              <TextField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
                InputLabelProps={{
                  className: "text-gray-500",
                }}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Choose Vehicle Color
              </label>
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="plate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Vehicle Plate Number
              </label>
              <TextField
                id="plate"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="Plate Number"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
                InputLabelProps={{
                  className: "text-gray-500",
                }}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Vehicle Capacity
              </label>
              <select
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
                required
              >
                <option value="" disabled>Select Capacity</option>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Vehicle Type
              </label>
              <select
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
                required
              >
                <option value="" disabled>Select Vehicle Type</option>
                {["Car", "Bike", "Auto"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Password
              </label>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
              />
            </div>

            <div className="w-full pt-4">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!py-3 !bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-300"
              >
                Sign Up as Captain
              </Button>
            </div>

            <div className="text-center flex gap-1 text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Already have a captain account?
              </label>
              <Link
                to="/captain/login"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CaptainSignup;
```

### Key Changes:

1. **Fixed Syntax Errors**: Corrected missing closing tags and properly aligned JSX elements
2. **Added API Integration**: 
   - Implemented axios POST request to `/captains/register` endpoint
   - Structured vehicle data properly in the request payload
3. **Added Navigation & User Context**:
   - Imported `useNavigate` and `UserDataContext`
   - Added redirect to captain dashboard after successful signup
4. **Added Toast Notifications**: 
   - Imported and implemented success/error toast messages
5. **Updated UI Text**:
   - Changed button text to "Sign Up as Captain"
   - Updated link text for captain login

The code now functions similar to the user Signup page but properly handles the captain-specific fields like vehicle information.

Similar code found with 1 license type

ViratSathavara: i want mui dropdown in my code 

<div className="w-full">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Vehicle Capacity
              </label>
              <select
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
                required
              >
                <option value="" disabled>Select Capacity</option>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Vehicle Type
              </label>
              <select
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50"
                required
              >
                <option value="" disabled>Select Vehicle Type</option>
                {["Car", "Bike", "Auto"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

GitHub Copilot: Here's how to replace your select elements with Material-UI dropdowns:

```jsx
// First make sure to import these components
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Then replace the select elements with these MUI versions

<div className="w-full">
  <label
    htmlFor="capacity"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Capacity
  </label>
  <FormControl fullWidth variant="outlined">
    <Select
      id="capacity"
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}
      displayEmpty
      required
      className="rounded-lg bg-gray-50"
    >
      <MenuItem value="" disabled>Select Capacity</MenuItem>
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>

<div className="w-full">
  <label
    htmlFor="vehicleType"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Type
  </label>
  <FormControl fullWidth variant="outlined">
    <Select
      id="vehicleType"
      value={vehicleType}
      onChange={(e) => setVehicleType(e.target.value)}
      displayEmpty
      required
      className="rounded-lg bg-gray-50"
    >
      <MenuItem value="" disabled>Select Vehicle Type</MenuItem>
      {["Car", "Bike", "Auto"].map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>
```

This implementation:

1. Uses MUI's `FormControl`, `Select`, and `MenuItem` components
2. Preserves all your existing functionality and values
3. Maintains similar styling to your other input fields with the rounded corners and gray background
4. Keeps the same labeling structure you were using
5. Retains the required validation

Make sure to update your imports at the top of the file to include the new MUI components.

ViratSathavara: i want all docs for new routes same as old docs for routes in  readme.md

GitHub Copilot: # API Documentation - Additional Routes

## Map Routes

### GET /maps/get-coordinate

**Description:**  
This endpoint retrieves GPS coordinates for a given address.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Query Parameters:**  
- `address` (string, min 3 characters) - The address to geocode.

**Response Status Codes:**
- `200 OK` - Successfully retrieved coordinates. Returns latitude and longitude.
- `400 Bad Request` - Validation errors in the query parameters. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during coordinate retrieval.

**Example Request:**
```
GET /maps/get-coordinate?address=Times%20Square%2C%20New%20York
```

**Example Successful Response:**
```json
{
  "lat": 40.7580,
  "lng": -73.9855
}
```

---

### GET /maps/get-distance-time

**Description:**  
This endpoint calculates the distance and estimated travel time between two locations.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Query Parameters:**  
- `origin` (string, min 1 character) - The starting address or coordinates.
- `destination` (string, min 1 character) - The destination address or coordinates.

**Response Status Codes:**
- `200 OK` - Successfully retrieved distance and time information.
- `400 Bad Request` - Validation errors in the query parameters. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during distance/time calculation.

**Example Request:**
```
GET /maps/get-distance-time?origin=Central%20Park%2C%20New%20York&destination=Times%20Square%2C%20New%20York
```

**Example Successful Response:**
```json
{
  "distance": {
    "text": "2.8 km",
    "value": 2774
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  },
  "status": "OK"
}
```

---

### GET /maps/get-suggestions

**Description:**  
This endpoint provides address suggestions based on partial text input for autocomplete functionality.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Query Parameters:**  
- `inputInput is required` (string, min 3 characters) - The partial text to get address suggestions for. *Note: Parameter name appears to contain a typo and should be fixed.*

**Response Status Codes:**
- `200 OK` - Successfully retrieved address suggestions.
- `400 Bad Request` - Validation errors in the query parameters. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during suggestion retrieval.

**Example Request:**
```
GET /maps/get-suggestions?inputInput%20is%20required=Times%20Sq
```

**Example Successful Response:**
```json
[
  {
    "description": "Times Square, Manhattan, NY, USA",
    "place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU",
    "structured_formatting": {
      "main_text": "Times Square",
      "secondary_text": "Manhattan, NY, USA"
    }
  },
  {
    "description": "Times Square Station, NY, USA",
    "place_id": "ChIJhRwB-FFYwokR5ZC9Rkh_f5k",
    "structured_formatting": {
      "main_text": "Times Square Station",
      "secondary_text": "NY, USA"
    }
  }
]
```

---

## Ride Routes

### POST /rides/create

**Description:**  
This endpoint is used to create a new ride request.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Body:**  
The following fields are required in the request body:
- `pickup` (string, min 3 characters) - The pickup location address.
- `destination` (string, min 3 characters) - The destination address.
- `vehicleType` (string, one of: 'auto', 'car', 'bike') - The type of vehicle requested.

**Response Status Codes:**
- `201 Created` - Ride created successfully. Returns the ride object.
- `400 Bad Request` - Validation errors in the request body. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during ride creation.

**Example Request:**
```json
{
  "pickup": "Central Park, New York",
  "destination": "Times Square, New York",
  "vehicleType": "car"
}
```

**Example Successful Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "user": "60d21b4667d0d8992e610c85",
  "pickup": "Central Park, New York",
  "destination": "Times Square, New York",
  "fare": 163.75,
  "otp": "1234",
  "status": "pending",
  "createdAt": "2023-05-16T12:00:00.000Z",
  "updatedAt": "2023-05-16T12:00:00.000Z"
}
```

**Fare Calculation:**  
Fares are calculated based on:
1. Base fare (varies by vehicle type)
   - Auto: ₹30
   - Car: ₹50
   - Bike: ₹20
2. Distance rate (per km)
   - Auto: ₹10/km
   - Car: ₹15/km
   - Bike: ₹8/km
3. Time rate (per minute)
   - Auto: ₹2/min
   - Car: ₹3/min
   - Bike: ₹1.5/min

**OTP Generation:**  
A 4-digit OTP is automatically generated for the ride, which must be verified when the ride begins.

ViratSathavara: add this data in readme.md file 

GitHub Copilot: Here's the content to add to your README.md file after the captain logout endpoint documentation:

```markdown
---

## Map Routes

### GET /maps/get-coordinate

**Description:**  
This endpoint retrieves GPS coordinates for a given address.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Query Parameters:**  
- `address` (string, min 3 characters) - The address to geocode.

**Response Status Codes:**
- `200 OK` - Successfully retrieved coordinates. Returns latitude and longitude.
- `400 Bad Request` - Validation errors in the query parameters. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during coordinate retrieval.

**Example Request:**
```json
GET /maps/get-coordinate?address=Times%20Square%2C%20New%20York
```

**Example Successful Response:**
```json
{
  "lat": 40.7580,
  "lng": -73.9855
}
```

---

### GET /maps/get-distance-time

**Description:**  
This endpoint calculates the distance and estimated travel time between two locations.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Query Parameters:**  
- `origin` (string, min 1 character) - The starting address or coordinates.
- `destination` (string, min 1 character) - The destination address or coordinates.

**Response Status Codes:**
- `200 OK` - Successfully retrieved distance and time information.
- `400 Bad Request` - Validation errors in the query parameters. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during distance/time calculation.

**Example Request:**
```json
GET /maps/get-distance-time?origin=Central%20Park%2C%20New%20York&destination=Times%20Square%2C%20New%20York
```

**Example Successful Response:**
```json
{
  "distance": {
    "text": "2.8 km",
    "value": 2774
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  },
  "status": "OK"
}
```

---

### GET /maps/get-suggestions

**Description:**  
This endpoint provides address suggestions based on partial text input for autocomplete functionality.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Query Parameters:**  
- `inputInput is required` (string, min 3 characters) - The partial text to get address suggestions for.

**Response Status Codes:**
- `200 OK` - Successfully retrieved address suggestions.
- `400 Bad Request` - Validation errors in the query parameters. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during suggestion retrieval.

**Example Request:**
```json
GET /maps/get-suggestions?inputInput%20is%20required=Times%20Sq
```

**Example Successful Response:**
```json
[
  {
    "description": "Times Square, Manhattan, NY, USA",
    "place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU",
    "structured_formatting": {
      "main_text": "Times Square",
      "secondary_text": "Manhattan, NY, USA"
    }
  },
  {
    "description": "Times Square Station, NY, USA",
    "place_id": "ChIJhRwB-FFYwokR5ZC9Rkh_f5k",
    "structured_formatting": {
      "main_text": "Times Square Station",
      "secondary_text": "NY, USA"
    }
  }
]
```

---

## Ride Routes

### POST /rides/create

**Description:**  
This endpoint is used to create a new ride request.

**Request Headers:**  
- `Authorization` (string, required) - Bearer token for user authentication.

**Request Body:**  
The following fields are required in the request body:
- `pickup` (string, min 3 characters) - The pickup location address.
- `destination` (string, min 3 characters) - The destination address.
- `vehicleType` (string, one of: 'auto', 'car', 'bike') - The type of vehicle requested.

**Response Status Codes:**
- `201 Created` - Ride created successfully. Returns the ride object.
- `400 Bad Request` - Validation errors in the request body. Returns an array of error messages.
- `401 Unauthorized` - User is not authenticated or token is invalid.
- `500 Internal Server Error` - Server error during ride creation.

**Example Request:**
```json
{
  "pickup": "Central Park, New York",
  "destination": "Times Square, New York",
  "vehicleType": "car"
}
```

**Example Successful Response:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "user": "60d21b4667d0d8992e610c85",
  "pickup": "Central Park, New York",
  "destination": "Times Square, New York",
  "fare": 163.75,
  "otp": "1234",
  "status": "pending",
  "createdAt": "2023-05-16T12:00:00.000Z",
  "updatedAt": "2023-05-16T12:00:00.000Z"
}
```

**Fare Calculation:**  
Fares are calculated based on:
1. Base fare (varies by vehicle type)
   - Auto: ₹30
   - Car: ₹50
   - Bike: ₹20
2. Distance rate (per km)
   - Auto: ₹10/km
   - Car: ₹15/km
   - Bike: ₹8/km
3. Time rate (per minute)
   - Auto: ₹2/min
   - Car: ₹3/min
   - Bike: ₹1.5/min

**OTP Generation:**  
A 4-digit OTP is automatically generated for the ride, which must be verified when the ride begins.




### GET /rides/get-fare

**Description:**  
Retrieves the estimated fare for a ride based on pickup and destination locations.

**Request Headers:**  
- `Authorization` (string, required) – Bearer token for user authentication.

**Query Parameters:**  
- `pickup` (string, min 1 character) – Pickup location address or coordinates.  
- `destination` (string, min 1 character) – Destination address or coordinates.

**Response Status Codes:**  
- `200 OK` – Fare data retrieved successfully. Returns an object with fare information.  
- `400 Bad Request` – Validation errors in the query parameters. Returns an array of error messages.  
- `401 Unauthorized` – User is not authenticated or token is invalid.  
- `500 Internal Server Error` – Server error during fare calculation.

**Example Request:**


**Example Successful Response:**
```json
{
  "auto": 98.45,
  "car": 120.75,
  "bike": 85.35
}