import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
      console.error('error in login login fn', err);
    }
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col space-y-12'>
        <h1 className='m-2 text-2xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className='p-3 text-lg font-bold' htmlFor='username'>
            Username:
          </label>
          <input
            className='input input-bordered input-primary'
            type='text'
            name='usename'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className='p-3 text-lg font-bold' htmlFor='password'>
            Password:
          </label>
          <input
            className='input input-bordered input-primary'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='p-3'>
            <button className='text-lg font-bold btn' type='submit'>
              Login
            </button>
          </span>
          <p className='font-bold text-center text-red-600'>{errorMessage}</p>
        </form>
        <Link className='font-bold text-center' to='/account/register'>
          👋 New Account? Sign up here!
        </Link>
      </div>
    </div>
  );
};

export default Login;
