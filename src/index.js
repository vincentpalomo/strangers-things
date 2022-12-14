import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Posts, Profile, Login, Home, Register } from './components';

const App = () => {
  const APIURL = "https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT";
  const [token, setToken] = useState('')

  useEffect(() => {
    const loggedInUser = async () => {
      const res = await fetch(`${APIURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        })
        .catch(console.error);
    };
    loggedInUser()
  }, [])
  

  return (
    <BrowserRouter>
      <div className='container'>
        <div className='navbar'>
          <h1 className='home-title'>Stranger's Things</h1>
          <Link className='navlinks' to='/'>
            Home
          </Link>
          <Link className='navlinks' to='/posts'>
            Posts
          </Link>
          <Link className='navlinks' to='/account'>
            Profile
          </Link>
          <Link className='navlinks' to='/account/login'>
            Login
          </Link>
        </div>
      </div>
      <div className='app'>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/posts'>
          <Posts APIURL={APIURL} />
        </Route>
        <Switch>
          <Route exact path='/account'>
            <Profile token={token} />
          </Route>
          <Route path='/account/login'>
            <Login APIURL={APIURL} setToken={setToken} />
          </Route>
          <Route path='/account/register'>
            <Register APIURL={APIURL} setToken={setToken} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
