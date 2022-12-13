import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className='login-container'>
      <h1>Login</h1>
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
          type='text'
          name='password'
          value={password}
          onChange={handlePassword}
        />
        <button type='submit'>Submit</button>
      </form>
      <Link className='create-account' to='/account/signup'>
        👋 New Account? Sign up here!
      </Link>
    </div>
  );
};

export default Login;
