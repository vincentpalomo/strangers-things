import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    setLocation('');
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className='register-container'>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='usename'
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
        <label htmlFor='password'>Location</label>
        <input
          type='text'
          name='location'
          value={location}
          onChange={handleLocation}
        />
        <button type='submit'>Create Account</button>
      </form>
      <Link to='/account/login'>🤔 Already a user? Sign in!</Link>
    </div>
  );
};

export default Register;
