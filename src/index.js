import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Posts, Profile, Login, Home } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <div className='navbar'>
          <h1>Stranger's Things</h1>
          <Link to='/'>Home</Link>
          <Link to='/posts'>Posts</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
      <div className='app'>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/posts'>
          <Posts />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
