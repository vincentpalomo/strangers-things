import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Posts, Profile, Login, Home, Register } from './components';

const App = () => {
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
          <Posts />
        </Route>
        <Switch>
          <Route exact path='/account'>
            <Profile />
          </Route>
          <Route path='/account/login'>
            <Login />
          </Route>
          <Route path='/account/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
