import React from 'react';
import { Link, useHistory } from 'react-router-dom';
const Nav = ({ online, setOnline, setCurrentUserID }) => {
  let history = useHistory();

  const logout = () => {
    setOnline(false);
    setCurrentUserID('');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    history.push('./');
  };

  return (
    <div className='relative container mx-auto p-6'>
      <div className='flex items-center justify-between'>
        <div className='pt-2 font-bold'>
          <Link to='/'>
            <h1 className='title'>Stranger's Things👥</h1>
          </Link>
        </div>
        <div className='flex space-x-12'>
          <Link className='hover:text-slate-600' to='/'>
            Home
          </Link>
          <Link className='hover:text-slate-600' to='/posts'>
            Posts
          </Link>
          {online === true ? (
            <Link className='hover:text-slate-600' to='/account'>
              Profile
            </Link>
          ) : (
            <Link className='hover:text-slate-600' to='/account/login'>
              Login
            </Link>
          )}
          {online === true && (
            <Link className='hover:text-slate-600' to='/' onClick={logout}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
