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
          <label className='p-3 font-bold text-lg' htmlFor='username'>
            Username:
          </label>
          <input
            className='input input-bordered input-primary'
            type='text'
            name='usename'
            value={username}
            onChange={handleUsername}
          />
          <label className='p-3 font-bold text-lg' htmlFor='password'>
            Password:
          </label>
          <input
            className='input input-bordered input-primary'
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
          <span className='p-3'>
            <button className='btn font-bold text-lg' type='submit'>
              Login
            </button>
          </span>
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
