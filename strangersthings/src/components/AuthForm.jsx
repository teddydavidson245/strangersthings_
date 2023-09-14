// import { useState } from "react"
// export default function AuthForm({buttonText, handleSubmit}){
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     return(
// <form onSubmit={(e) =>handleSubmit(e, username, password)}>
//   <label htmlFor="username">Username</label>
//   <input
//     type="text"
//     id="username"
//     value={username}
//     onChange={(e) => setUsername(e.target.value)}
//   />
//   <label htmlFor="password">Password</label>
//   <input
//     type="password"
//     id="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
//   <button type="submit">{buttonText}</button>
// </form>

//     )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import RegistrationForm from './Register';
// import LoginForm from './Login';

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
const isLoggedIn = (token) => {
  return !!token; // Returns true if there is a token, otherwise false
};

// Helper function to create headers for API requests, including the bearer token if logged in
const makeHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (isLoggedIn(token)) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

function RegistrationForm({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Perform form validation
    if (formData.password.length < 8) {
      setErrors({ password: 'Password must be at least 8 characters long' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    // If validation passes, send data to the backend
    // You can use Axios or fetch here to make the API request
    // Example:
    // axios.post('your-backend-api-url/register', formData)
    //   .then(response => {
    //     console.log('Registration successful', response.data);
    //     setIsSubmitted(true);
    //   })
    //   .catch(error => {
    //     console.error('Registration failed', error);
    //   });

    // For example without sending to backend, we'll just log the form data
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>Register</h2>
      {isSubmitted ? (
        <p>Registration successful! You can now log in.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder='username*'
              value={formData.username}
              onChange={handleChange}
              required
              minLength={5} // Adjust as needed
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='password*'
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8} // Adjust as needed
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='password*'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}


function LoginForm({ onLogin }) {
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


   //TO WAIT FOR BACKEND API 
    // try {
    //   // Send login data to the backend
    //   const response = await axios.post('your-backend-api-url/login', formData, {
    //     headers: makeHeaders(),
    //   });

    //   // Check for a successful login and token in the response
    //   if (response.data.success && response.data.token) {
    //     // Log the user in and store the token
    //     logIn(response.data.token);
    //     setIsSubmitted(true);
    //   } else {
    //     console.error('Login failed:', response.data.message);
    //   }
    // } catch (error) {
    //   console.error('Login failed', error);
    // }
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
          value={formData.username}
          onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
          type="password"
          id="password"
          value={formData.password}
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
{/* <LoginForm/> */}

function AuthContainer() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if there is a token in sessionStorage when the app loads
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      logIn(storedToken);
    }
  }, []);

  return (
    <div>
      {isLoggedIn(token) ? (
        <div>
          <p>Welcome, you are logged in!</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <div>
          {/* <h2>Register</h2> */}
          <RegistrationForm onRegister={logIn} />
          {/* <h2>Login</h2> */}
          <LoginForm onLogin={logIn} />
        </div>
      )}
    </div>
  );
}

export default AuthContainer;

