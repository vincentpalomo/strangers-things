import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Posts,
  Profile,
  Login,
  Home,
  Register,
  AddPost,
  EditPost,
  SinglePost,
  Messages,
  Nav,
} from './components';

export const APIURL =
  'https://strangers-things.herokuapp.com/api/2209-FTB-CT-WEB-PT';

const App = () => {
  const [token, setToken] = useState('');
  const [online, setOnline] = useState(false);
  const [currentUserID, setCurrentUserID] = useState('');
  const [postID, setPostID] = useState('');
  const [postData, setPostData] = useState();
  // console.log('is online? ', online);
  // console.log('token from app:', token);
  // console.log(currentUserID);

  useEffect(() => {
    const data = localStorage.getItem('token', token);
    // console.log('token from localStorage:', data);
    const userID = localStorage.getItem('userID', currentUserID);
    setToken(data);
    setCurrentUserID(userID);
    if (data) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className='container'>
        <Nav
          online={online}
          setOnline={setOnline}
          setCurrentUserID={setCurrentUserID}
        />
      </div>
      <div className='app'>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/posts'>
          <Posts
            token={token}
            currentUserID={currentUserID}
            online={online}
            setPostID={setPostID}
            setPostData={setPostData}
          />
        </Route>
        <Route path='/posts/addpost'>
          <AddPost token={token} />
        </Route>
        <Route path='/posts/editpost'>
          <EditPost
            token={token}
            currentUserID={currentUserID}
            postID={postID}
          />
        </Route>
        <Route path='/posts/singlepost'>
          <SinglePost
            token={token}
            currentUserID={currentUserID}
            online={online}
            setPostID={setPostID}
            setPostData={setPostData}
            postID={postID}
            postData={postData}
          />
        </Route>
        <Route path='/account/messages'>
          <Messages
            token={token}
            currentUserID={currentUserID}
            postID={postID}
          />
        </Route>
        <Switch>
          <Route exact path='/account'>
            <Profile
              token={token}
              setOnline={setOnline}
              currentUserID={currentUserID}
              setCurrentUserID={setCurrentUserID}
              setPostID={setPostID}
            />
          </Route>
          <Route path='/account/login'>
            <Login setToken={setToken} setOnline={setOnline} />
          </Route>
          <Route path='/account/register'>
            <Register setToken={setToken} setOnline={setOnline} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
