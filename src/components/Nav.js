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
    <div className='navbar'>
      <Link to='/'>
        <h1 className='title'>Stranger's Things</h1>
      </Link>
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
      {online === true && (
        <Link className='navlinks' to='/' onClick={logout}>
          Logout
          {/* <button className='navlinks'>Logout</button> */}
        </Link>
      )}
    </div>
  );
};

export default Nav;
