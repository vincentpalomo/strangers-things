import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ APIURL, token, setOnline, setToken }) => {
  const [userData, setUserData] = useState({});
  let history = useHistory();
  console.log(userData);

  useEffect(() => {
    loggedInUser();
  }, []);

  const loggedInUser = async () => {
    const res = await fetch(`${APIURL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setUserData(result.data);
      })
      .catch(console.error);
  };

  const logout = () => {
    setOnline(false);
    localStorage.removeItem('token');
    history.push('./');
  };

  return (
    <div className='profile-container'>
      {userData === null ? (
        <h1>You are not logged in 🤨</h1>
      ) : (
        <>
          <h1>Profile</h1>
          <h3>👋 Welcome back, {userData.username}!</h3>
          <p>Username: {userData.username}</p>
          <p>User ID: {userData._id}</p>
          <p>Cohort: {userData.cohort}</p>
          {/* <p>Posts: {userData.posts}</p> */}
          <div>
            {userData.posts.map((post, i) => {
              return (
                <div key={i}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p>Price: {post.price}</p>
                  <p>Seller: {post.author.username}</p>
                  <p>Location: {post.location}</p>
                </div>
              );
            })}
          </div>
          <p>Messages: {userData.messages}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Profile;
