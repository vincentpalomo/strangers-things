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
          <Link to='/Posts'>Posts</Link>
          <Link to='/Profile'>Profile</Link>
          <Link to='/Login'>Login</Link>
        </div>
      </div>
      <div className='app'>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/Posts'>
          <Posts />
        </Route>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
