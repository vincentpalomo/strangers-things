import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ APIURL, token, setOnline }) => {
  const [userData, setUserData] = useState({});
  // const [online, setOnline] = useState(false);
  let history = useHistory();
  // console.log(userData);

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
      })
      .catch(console.error);
  };

  const logout = () => {
    setOnline(false);
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
          <p>Posts: {userData.posts}</p>
          <p>Messages: {userData.messages}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Profile;
