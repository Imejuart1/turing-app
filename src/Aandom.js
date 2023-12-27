import React, { useState, useEffect } from 'react';

const RandomUserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
    try{
    const response = await fetch ('https://randomuser.me/api/?results=100');

    const data = await response.json();
    setUsers(data.results);

    }catch (error){
       setError(error.message);


    }
  }
  fetchData();
  }, [])
  return (
 <div>
      <h1>Random User List</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
         <ul>
          {users.map((user)=> (
            <li >
              <img src={user.picture.thumbnail} />
            </li>
          ))}
         </ul>
      )}
      <div>
        {users.map((user) => (
          <li>
            <div>{user.email}</div>
          </li>
        ))}
      </div>

    </div>
  );
};

export default RandomUserList;
