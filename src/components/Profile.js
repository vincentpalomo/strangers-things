import React from 'react';

const Profile = ({ token }) => {
  console.log(token)

  return (
    <div className='profile-container'>
      <h1>You must be logged in to view your account!</h1>
    </div>
  );
};

export default Profile;
