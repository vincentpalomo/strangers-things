import React from 'react';
import { Link } from 'react-router-dom';
const Nav = ({ online }) => {
  return (
    <div className='navbar'>
      <h1 className='home-title'>Stranger's Things</h1>
      <Link className='navlinks' to='/'>
        Home
      </Link>
      <Link className='navlinks' to='/posts'>
        Posts
      </Link>
      {online === true ? (
        <Link className='navlinks' to='/account'>
          Profile
        </Link>
      ) : (
        <Link className='navlinks' to='/account/login'>
          Login
        </Link>
      )}
    </div>
  );
};

export default Nav;
