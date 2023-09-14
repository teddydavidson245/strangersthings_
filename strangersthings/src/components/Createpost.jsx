// import { useState } from "react"


// export default function Createpost(){
//     const [title, setTitle] = useState('')
//     const [description, setDescription] = useState('')
//     const [price, setPrice] = useState('')
//     const [location, setLocation] = useState('')
//     const [ willDeliver, setWillDeliver] = useState(false)
//     return(
//         <form>
//             <label htmlFor="title">Title</label>
//             <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//             <label htmlFor="description">Description</label>
//             <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//             <textarea name="description" id="description" cols="30" rows="10"></textarea>
//             <label htmlFor="price">Price</label>
//             <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
//             <label htmlFor="location">Location</label>
//             <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
//             <label htmlFor="price">Price</label>
//             <input type="checkbox" id="willDeliver" value={willDeliver} onChange={(e) => setWillDeliver(e.target.value)} />
//             <button type="submit"></button>
//         </form>
//     )
// }

import React, { useState } from 'react';
import axios from 'axios';
import AuthContainer from './AuthForm';

function ListingCreationForm({ token }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request data based on the API's expected format
    const requestData = {
      post: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
      },
    };

    try {
      // Send a POST request to the API to create a new listing
      const response = await axios.post('https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-b/posts', requestData, {
        headers: {
          ...makeHeaders(token),
          'Content-Type': 'application/json',
        },
      });

      // Check if the post was successfully created
      if (response.data.success) {
        setIsSubmitted(true);
        // Optionally, reset the form fields
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
        });
      } else {
        console.error('Listing creation failed:', response.data.message);
      }
    } catch (error) {
      console.error('Listing creation failed', error);
    }
  };

  return (
    <div>
      <h2>Create a New Listing</h2>
      {isSubmitted ? (
        <p>Listing created successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Create Listing</button>
        </form>
      )}
    </div>
  );
}

export default ListingCreationForm;
