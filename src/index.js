import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Posts from './components/Posts';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <div className='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/Posts'>Posts</Link>
        </div>
      </div>
      <div className='app'>
        <Route path='/Posts'>
          <Posts />
        </Route>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
