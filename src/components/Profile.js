import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchLoggedInUser, fetchDeletePost } from '../api/api';

const Profile = ({
  token,
  setOnline,
  currentUserID,
  setCurrentUserID,
  setPostID,
  setPostData,
}) => {
  const [userData, setUserData] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (token === '') {
      return;
    }
    loggedInUser(token);
  }, [token]);

  const loggedInUser = async (token) => {
    try {
      const currentUser = await fetchLoggedInUser(token);
      setUserData(currentUser.data);
      setCurrentUserID(currentUser.data._id);
      localStorage.setItem('userID', currentUser.data._id);
    } catch (err) {
      console.error('something went wrong', err);
    }
  };

  const logout = () => {
    setOnline(false);
    setCurrentUserID('');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    history.push('./');
  };

  const deletePost = async (postID, token) => {
    try {
      const deletePost = await fetchDeletePost(postID, token);
      if (!deletePost.success) {
        alert(deletePost.error.message);
      }
      loggedInUser(token);
    } catch (err) {
      console.error('something went wrong', err);
    }
  };

  const getPostID = async (postID) => {
    setPostID(postID);
  };

  const sendPost = async (post) => {
    setPostData(post);
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
                    <div className='border'>
                      <Link
                        to={`/posts/singlepost`}
                        onClick={() => sendPost(post)}
                      >
                        <h3>{post.title}</h3>
                      </Link>
                      <p>{post.description}</p>
                      <p>Price: {post.price}</p>
                      <p>Location: {post.location}</p>
                      <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'} </p>
                      <Link to='/posts/editpost'>
                        <button onClick={() => getPostID(post._id)}>
                          Edit
                        </button>
                      </Link>
                      <button onClick={() => deletePost(post._id, token)}>
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
                <div className='border' key={i}>
                  <h3>Messages</h3>
                  <p>From Post: {message.post.title}</p>
                  <p>Post ID: {message.post._id}</p>
                  <p>User: {message.fromUser.username}</p>
                  <p>Message: {message.content}</p>
                  {currentUserID !== message.fromUser._id ? (
                    <div>
                      <Link to='/account/messages'>
                        <button onClick={() => getPostID(message.post._id)}>
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
