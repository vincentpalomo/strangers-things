import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { APIURL } from '..';
import { fetchLogin } from '../api/api';

const Login = ({ setToken, setOnline }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');

    try {
      const login = await fetchLogin(username, password);
      console.log(login);
      setToken(login.data.token);
      setOnline(true);
      localStorage.setItem('token', login.data.token);
      history.push('/account');
    } catch (err) {
      console.error('something went wrong', err);
    }

    // const response = await fetch(`${APIURL}/users/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user: {
    //       username: `${username}`,
    //       password: `${password}`,
    //     },
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     console.log('token:', result.data.token);
    //     setToken(result.data.token);
    //     setOnline(true);
    //     history.push('/account');
    //     localStorage.setItem('token', result.data.token);
    //   })
    //   .catch(console.error);
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
      </form>
      <Link className='create-account' to='/account/register'>
        👋 New Account? Sign up here!
      </Link>
    </div>
  );
};

export default Login;
