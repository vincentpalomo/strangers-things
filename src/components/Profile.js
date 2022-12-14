import React, { useEffect, useState } from 'react';

const Profile = ({ APIURL, token }) => {
  const [userData, setUserData] = useState({});
  const [online, setOnline] = useState(false);
  // console.log(userData);
  console.log(online);

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
        // console.log(result.data);
        setUserData(result.data);
        setOnline(true);
      })
      .catch(console.error);
  };

  const logout = () => {
    setOnline(false);
  };

  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <h3>👋 Welcome back, {userData.username}!</h3>
      <p>Username: {userData.username}</p>
      <p>User ID: {userData._id}</p>
      <p>Cohort: {userData.cohort}</p>
      <p>Posts: {userData.posts}</p>
      <p>Messages: {userData.messages}</p>
      {online ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>You are not logged in 🤨</p>
      )}
    </div>
  );
};

export default Profile;
