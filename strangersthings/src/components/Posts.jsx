import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    // Define the URL of the API
    const apiUrl = 'https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-b/posts';

    // Use Axios to make a GET request to the API
    axios.get(apiUrl)
      .then(response => {
        // Update the state with the data from the API
        setPosts(response.data.data.posts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

   // Function to fetch listings data from the API
   const fetchListings = async () => {
    try {
      const response = await axios.get('https://strangers-things.herokuapp.com/api/2302-acc-pt-web-pt-b/posts');

      if (response.data.success) {
        setListings(response.data.data.posts);
        // Filter listings based on the search term
        filterListings(searchTerm);
      } else {
        console.error('Failed to fetch listings data:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch listings data', error);
    }
  };

  // Function to filter listings based on the search term
  const filterListings = (term) => {
    const filtered = listings.filter((listing) =>
      listing.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  // Handle changes in the search input field
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterListings(e.target.value);
  };

  return (
    <div>
        {/* Search form */}
        <div>
            <label htmlFor="search">Search Listings:</label>
            <input
              type="text"
              id="search"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Display filtered listings */}
          {/* <h3>Listings:</h3> */}
          {filteredListings.length > 0 ? (
            <ul>
              {filteredListings.map((listing) => (
                <li key={listing._id}>{listing.title}</li>
              ))}
            </ul>
          ) : (
            <p>No listings match your search.</p>
          )}

      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map(post => (
             <div key={post._id}>
             <h2>{post.title}</h2>
             <p>Available?: {post.active.toString()}</p>
             <p>{post.description}</p>
             <p>Price: {post.price}</p>
             {/* <p>Messages: {post.messages}</p> */}
             <p>Location: {post.location}</p>
             <p>Delivery: {post.willDeliver.toString()}</p>
             <p>Seller: {post.author.username}</p>
             {/* <p>Created At: {new Date(post.createdAt).toLocaleString()}</p> */}
           </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Posts;
