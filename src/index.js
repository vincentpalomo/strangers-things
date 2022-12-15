import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Posts, Profile, Login, Home, Register } from './components';

const App = () => {
  const APIURL = 'https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT';
  const [token, setToken] = useState([]);
  const [online, setOnline] = useState(false);
  console.log('is online? ', online);
  // console.log('token from app:', token);

  useEffect(() => {
    const data = localStorage.getItem('token', JSON.stringify(token));
    console.log('token from localStorage:', data);
    setToken(data);
    if (data) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, []);

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
            <Profile
              APIURL={APIURL}
              token={token}
              setToken={setToken}
              online={online}
              setOnline={setOnline}
            />
          </Route>
          <Route path='/account/login'>
            <Login APIURL={APIURL} setToken={setToken} setOnline={setOnline} />
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
