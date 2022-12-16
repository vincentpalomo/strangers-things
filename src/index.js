import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import {
  Posts,
  Profile,
  Login,
  Home,
  Register,
  AddPost,
  Nav,
} from './components';

export const APIURL =
  'https://strangers-things.herokuapp.com/api/2209-FTB-CT-WEB-PT';

const App = () => {
  const [token, setToken] = useState('');
  const [online, setOnline] = useState(false);
  console.log('is online? ', online);
  // console.log('token from app:', token);

  useEffect(() => {
    const data = localStorage.getItem('token', token);
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
        <Nav online={online} />
      </div>
      <div className='app'>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/posts'>
          <Posts APIURL={APIURL} />
        </Route>
        <Route path='/addpost'>
          <AddPost APIURL={APIURL} token={token} />
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
            <Register
              APIURL={APIURL}
              setToken={setToken}
              setOnline={setOnline}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
