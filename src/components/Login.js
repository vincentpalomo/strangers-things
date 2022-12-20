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
    <div className='flex justify-center items-center h-full'>
      <div className='flex flex-col space-y-12'>
        <h1 className='text-2xl text-white font-bold m-2'>Login</h1>
        <form onSubmit={handleSubmit}>
          <label className='p-1 font-bold' htmlFor='username'>
            Username:
          </label>
          <input
            className='p-2 rounded'
            type='text'
            name='usename'
            value={username}
            onChange={handleUsername}
          />
          <label className='p-1 font-bold' htmlFor='password'>
            Password:
          </label>
          <input
            className='p-2 rounded'
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
          <button
            className='bg-slate-800 text-slate-100 p-2 m-2 rounded font-bold'
            type='submit'
          >
            Login
          </button>
          <p className='text-red-600 font-bold text-center'>{errorMessage}</p>
        </form>
        <Link className='font-bold text-center' to='/account/register'>
          👋 New Account? Sign up here!
        </Link>
      </div>
    </div>
  );
};

export default Login;
