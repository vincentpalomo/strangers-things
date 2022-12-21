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
  FormTemplate,
} from './components';
import styles from './components/globalstyles.css';

export const APIURL =
  'https://strangers-things.herokuapp.com/api/2209-FTB-CT-WEB-PT';

const App = () => {
  const [token, setToken] = useState('');
  const [online, setOnline] = useState(false);
  const [currentUserID, setCurrentUserID] = useState('');
  const [postID, setPostID] = useState('');
  const [postData, setPostData] = useState();

  useEffect(() => {
    const data = localStorage.getItem('token', token);
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
      <div className='flex flex-col h-screen justify-between'>
        {/* header */}
        <header>
          <Nav
            online={online}
            setOnline={setOnline}
            setCurrentUserID={setCurrentUserID}
          />
        </header>
        {/* body */}
        <section className='mb-auto flex-grow overflow-y-auto'>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/form'>
            <FormTemplate />
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
              postData={postData}
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
                setPostData={setPostData}
              />
            </Route>
            <Route path='/account/login'>
              <Login setToken={setToken} setOnline={setOnline} />
            </Route>
            <Route path='/account/register'>
              <Register setToken={setToken} setOnline={setOnline} />
            </Route>
          </Switch>
        </section>
        {/* footer */}
        <footer className='footer footer-center p-10 bg-primary text-primary-content'>
          <div>
            <p className='font-bold'>
              Copyright © 2022 - All right reserved by Stranger's Things Ltd
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
