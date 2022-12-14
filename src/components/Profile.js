import React, { useEffect, useState } from 'react';

const Profile = ({ APIURL, token }) => {
  const [userData, setUserData] = useState({})
  console.log(userData)

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
        setUserData(result.data)
      })
      .catch(console.error);
  };

  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <p>Username: {userData.username}</p>
      <p>User ID: {userData._id}</p>
      <p>Cohort: {userData.cohort}</p>
    </div>
  );
};

export default Profile;
