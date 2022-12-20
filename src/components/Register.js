import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchRegister } from '../api/api';

const Register = ({ setToken, setOnline }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErroMessage] = useState('');
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');

    try {
      const register = await fetchRegister(username, password);
      if (!register.success) {
        setErroMessage(register.error.message);
      }
      setToken(register.data.token);
      setOnline(true);
      localStorage.setItem('token', register.data.token);
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
        <h1 className='text-2xl text-white font-bold m-2'>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <label className='p-1 font-bold' htmlFor='username'>
            Username:
          </label>
          <input
            className='p-1 rounded'
            type='text'
            name='usename'
            value={username}
            onChange={handleUsername}
          />
          <label className='p-1 font-bold' htmlFor='password'>
            Password:
          </label>
          <input
            className='p-1 rounded'
            type='password'
            name='password'
            value={password}
            onChange={handlePassword}
          />
          <button
            className='bg-slate-800 text-slate-100 p-2 m-2 rounded font-bold'
            type='submit'
          >
            Create Account
          </button>
          <p className='text-red-600 font-bold text-center'>{errorMessage}</p>
        </form>
        <Link className='font-bold text-center' to='/account/login'>
          🤔 Already a user? Sign in!
        </Link>
      </div>
    </div>
  );
};

export default Register;
