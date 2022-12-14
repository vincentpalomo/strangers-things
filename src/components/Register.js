import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ APIURL }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log('user', username, 'pass', password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    const response = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`
        }
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
        <button type='submit'>Create Account</button>
      </form>
      <Link to='/account/login'>🤔 Already a user? Sign in!</Link>
    </div>
  );
};

export default Register;
