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
      console.error('error in register fetchregister fn', err);
    }
  };

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col space-y-12'>
        <h1 className='m-2 text-2xl font-bold'>Create an account</h1>
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
            required
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
            required
          />
          <span className='p-3'>
            <button className='text-lg font-bold btn' type='submit'>
              Create Account
            </button>
          </span>
          <p className='font-bold text-center text-red-600'>{errorMessage}</p>
        </form>
        <Link className='text-base font-bold text-center' to='/account/login'>
          🤔 Already a user? Sign in!
        </Link>
      </div>
    </div>
  );
};

export default Register;
