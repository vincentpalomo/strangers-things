import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIURL } from '..';

const Profile = ({
  token,
  setOnline,
  currentUserID,
  setCurrentUserID,
  setPostID,
}) => {
  // console.log('i rendered', token, setOnline);
  const [userData, setUserData] = useState(null);
  let history = useHistory();
  // console.log('user data', userData);

  useEffect(() => {
    // console.log('useeffect ran');
    if (token === '') {
      return;
    }
    loggedInUser();
  }, [token]);

  const loggedInUser = async () => {
    const res = await fetch(`${APIURL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setUserData(result.data);
        setCurrentUserID(result.data._id);
        localStorage.setItem('userID', result.data._id);
      })
      .catch(console.error);
  };

  const logout = () => {
    setOnline(false);
    setCurrentUserID('');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    history.push('./');
  };

  const deletePost = async (postID) => {
    const res = await fetch(`${APIURL}/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        loggedInUser();
      })
      .catch(console.error);
  };

  const editPost = async (postID) => {
    setPostID(postID);
  };

  return (
    <div className='profile-container'>
      {userData === null ? (
        <h1>You are not logged in 🤨</h1>
      ) : (
        <div>
          <h1>Profile</h1>
          <h3>👋 Welcome back, {userData.username}!</h3>
          <p>Username: {userData.username}</p>
          <p>User ID: {userData._id}</p>
          <p>Cohort: {userData.cohort}</p>
          <div>
            <Link to='/posts/addpost'>
              <button>Create Post</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </div>

          <div>
            <h1>My Posts:</h1>
            {userData.posts.map((post, i) => {
              return (
                <div className='posts' key={i}>
                  {post.active ? (
                    <div>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <p>Price: {post.price}</p>
                      <p>Location: {post.location}</p>
                      <p>Will Deliver: {post.willDeliver ? 'yes' : 'no'} </p>
                      <Link to='/posts/editpost'>
                        <button onClick={() => editPost(post._id)}>Edit</button>
                      </Link>
                      <button onClick={() => deletePost(post._id)}>
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div>
            <h1>Messages:</h1>
            {userData.messages.map((message, i) => {
              return (
                <div className='messages' key={i}>
                  <h3>Messages</h3>
                  <p>From Post: {message.post.title}</p>
                  <p>Post ID: {message.post._id}</p>
                  <p>User: {message.fromUser.username}</p>
                  <p>Message: {message.content}</p>
                  {currentUserID !== message.fromUser._id ? (
                    <div>
                      <Link to='/account/messages'>
                        <button onClick={() => editPost(message.post._id)}>
                          Reply
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
