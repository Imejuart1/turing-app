import React, { useState, useEffect } from 'react';

const RandomUserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=100');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
 <div>
      <h1>Random User List</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <img src={user.picture.thumbnail} alt="User Thumbnail" />
              <p>
                {user.name.first} {user.name.last}
              </p>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RandomUserList;
