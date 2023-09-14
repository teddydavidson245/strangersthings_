// import { useState } from "react"
// import AuthForm from "./AuthForm"

// export default function Register({setToken}){

//     return(
//         <div>
//           <h1>Register</h1>
//           <AuthForm buttonText={"Register"}/>
//             EMAIL??? ADDRESS???
//         </div>
//     )
// }

import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
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

// TO BE USED WITH THE RIGHT BACKEND API
// try {
//     // Send registration data to the backend
//     const response = await axios.post('https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-b/register', formData);

//     // Check for a successful registration and token in the response
//     if (response.data.success && response.data.token) {
//       // Store the token in state and optionally in sessionStorage
//       setToken(response.data.token);
//       sessionStorage.setItem('token', response.data.token);

//       // Registration successful
//       setIsSubmitted(true);
//     } else {
//       console.error('Registration failed:', response.data.message);
//     }
//   } catch (error) {
//     console.error('Registration failed', error);
//   }
// };

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

export default RegistrationForm;
