import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { APIURL } from '..';
import { fetchLogin } from '../api/api';

const Login = ({ setToken, setOnline }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErroMessage] = useState('');
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');

    try {
      const login = await fetchLogin(username, password);
      if (!login.success) {
        setErroMessage(login.error.message);
      }
      setToken(login.data.token);
      setOnline(true);
      localStorage.setItem('token', login.data.token);
      history.push('/account');
    } catch (err) {
      console.error('something went wrong', err);
    }
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
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />
        <button type='submit'>Login</button>
        <p>{errorMessage}</p>
      </form>
      <Link className='create-account' to='/account/register'>
        👋 New Account? Sign up here!
      </Link>
    </div>
  );
};

export default Login;
