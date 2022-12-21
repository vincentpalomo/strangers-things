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

  const getPostID = async (postID, post) => {
    setPostID(postID);
    setPostData(post);
  };

  const sendPost = async (post) => {
    setPostData(post);
  };

  return (
    <div className='flex justify-center items-center'>
      {userData === null ? (
        <h1>You are not logged in 🤨</h1>
      ) : (
        <div className='h-full'>
          <h1 className='text-2xl text-white font-bold m-2'>Profile:</h1>
          <div className='card w-96 bg-primary text-primary-content'>
            <div className='card-body'>
              <h3 className='card-title'>
                👋 Welcome back, {userData.username}!
              </h3>
              <p>Username: {userData.username}</p>
              <p>User ID: {userData._id}</p>
              <p>Cohort: {userData.cohort}</p>
            </div>
          </div>
          <div className='flex mt-3 flex-row gap-3 justify-center p-3'>
            <Link to='/posts/addpost'>
              <button className='btn'>Create Post</button>
            </Link>
            <button className='btn' onClick={logout}>
              Logout
            </button>
          </div>

          <div>
            <h1 className='text-2xl text-white font-bold m-2'>My Posts:</h1>
            {userData.posts.map((post, i) => {
              return (
                <div
                  className='card w-96 bg-primary text-primary-content'
                  key={i}
                >
                  {post.active ? (
                    <div className='card-body'>
                      <Link
                        className='link link-hover link-neutral'
                        to={`/posts/singlepost`}
                        onClick={() => sendPost(post)}
                      >
                        <h3 className='card-title'>{post.title}</h3>
                      </Link>
                      <div className='p-2'>
                        <p>{post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Location: {post.location}</p>
                        <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'} </p>
                      </div>
                      <div className='card-actions justify-end'>
                        <Link to='/posts/editpost'>
                          <button
                            className='btn'
                            onClick={() => getPostID(post._id, post)}
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          className='btn'
                          onClick={() => deletePost(post._id, token)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div>
            <h1 className='text-2xl text-white font-bold m-2'>Messages:</h1>
            {userData.messages.map((message, i) => {
              return (
                <div
                  className='card w-96 bg-primary text-primary-content'
                  key={i}
                >
                  <div className='card-body'>
                    <h3 className='card-title text-neutral'>
                      Message from: {message.fromUser.username}
                    </h3>
                    <div className='p-2'>
                      <p>From Post: {message.post.title}</p>
                      <p>Post ID: {message.post._id}</p>
                      <p>User: {message.fromUser.username}</p>
                      <p>Message: {message.content}</p>
                    </div>
                    {currentUserID !== message.fromUser._id ? (
                      <div className='card-actions justify-end'>
                        <Link to='/account/messages'>
                          <button
                            className='btn'
                            onClick={() => getPostID(message.post._id)}
                          >
                            Reply
                          </button>
                        </Link>
                      </div>
                    ) : null}
                  </div>
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
