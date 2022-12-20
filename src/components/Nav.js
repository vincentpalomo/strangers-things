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
            <h1 className='font-extrabold text-2xl'>Stranger's Things👥</h1>
          </Link>
        </div>
        <Link className='hover:text-slate-100 text-xl' to='/'>
          Home
        </Link>
        <Link className='hover:text-slate-100 text-xl' to='/posts'>
          Posts
        </Link>
        {online === true ? (
          <Link className='hover:text-slate-100 text-xl' to='/account'>
            Profile
          </Link>
        ) : (
          <Link className='hover:text-slate-100 text-xl' to='/account/login'>
            Login
          </Link>
        )}
        {online === true && (
          <Link
            className='hover:text-slate-100 text-xl'
            to='/'
            onClick={logout}
          >
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
