// import { useState } from "react"
// import AuthForm from "./AuthForm"

// export default function Login({setToken}){
//  function handleSubmit(e, username, password){
//     e.preventDefault();
//     console.log("login form submitted");
//  }
//     return(
//         <div>
//             <h1>Login</h1>
//            <AuthForm buttonText="Login" handleSubmit={handleSubmit}/>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to set the token in both state and sessionStorage
const logIn = (token) => {
  // Set the token in state
  setToken(token);

  // Optionally, store the token in sessionStorage
  sessionStorage.setItem('token', token);
};

// Helper function to clear the token from both state and sessionStorage
const logOut = () => {
  // Clear the token from state
  setToken('');

  // Optionally, remove the token from sessionStorage
  sessionStorage.removeItem('token');
};

// Helper function to check if a user is logged in
const isLoggedIn = () => {
  return !!token; // Returns true if there is a token, otherwise false
};

// Helper function to create headers for API requests, including the bearer token if logged in
const makeHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (isLoggedIn()) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if there is a token in sessionStorage when the app loads
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      logIn(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    try {
      // Send login data to the backend
      const response = await axios.post('your-backend-api-url/login', formData, {
        headers: makeHeaders(),
      });

      // Check for a successful login and token in the response
      if (response.data.success && response.data.token) {
        // Log the user in and store the token
        logIn(response.data.token);
        setIsSubmitted(true);
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    // Log the user out and clear the token
    logOut();
    setIsSubmitted(false);
  };

  return (
    <div>
      <h2>{isLoggedIn() ? 'Logged In' : 'Logged Out'}</h2>

      {isLoggedIn() ? (
        <div>
          <p>Welcome, you are logged in!</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          {isSubmitted ? (
            <p>Login successful!</p>
          ) : (
            <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
