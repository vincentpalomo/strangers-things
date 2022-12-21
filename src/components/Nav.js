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
    <div className='navbar navbar-center bg-primary text-primary-content py-6'>
      <div className='px-6 font-bold'>
        <Link to='/'>
          <h1 className='font-extrabold text-2xl'>Stranger's Things👥</h1>
        </Link>
      </div>
      <div className='mx-auto flex items-center gap-10'>
        <Link className='btn btn-active text-lg' to='/'>
          Home
        </Link>

        <Link className='btn btn-active text-lg' to='/posts'>
          Posts
        </Link>
        {online === true ? (
          <Link className='btn btn-active text-lg' to='/account'>
            Profile
          </Link>
        ) : (
          <Link className='btn btn-active text-lg' to='/account/login'>
            Login
          </Link>
        )}
        {online === true && (
          <Link className='btn btn-active text-lg' to='/' onClick={logout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
