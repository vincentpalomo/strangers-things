import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { APIURL } from '..';

const Register = ({ setToken, setOnline }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  console.log('user', username, 'pass', password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');

    const response = await fetch(`${APIURL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          password: `${password}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setToken(result.data.token);
        setOnline(true);
        history.push('/account');
        localStorage.setItem('token', result.data.token);
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
