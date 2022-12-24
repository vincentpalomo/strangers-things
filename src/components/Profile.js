import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchLoggedInUser, fetchDeletePost, fetchMessages } from '../api/api';

const Profile = ({
  token,
  setOnline,
  setCurrentUserID,
  currentUserID,
  setPostID,
  setPostData,
}) => {
  const [userData, setUserData] = useState(null);
  const [content, setContent] = useState('');
  let history = useHistory();
  console.log(userData);

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
      console.error('error in profile loggedinuser fn', err);
    }
  };

  const messages = async (postID) => {
    setContent('');
    try {
      const messages = await fetchMessages(token, postID, content);
      console.log(messages);
      loggedInUser(token);
    } catch (err) {
      console.error('error in profile message fn', err);
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
      console.error('error in profile deletepost fn', err);
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
    <div className='flex items-center justify-center'>
      {userData === null ? (
        <h1>You are not logged in 🤨</h1>
      ) : (
        <div className='h-full'>
          <h1 className='m-2 text-2xl font-bold text-primary'>Profile:</h1>
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
          <div className='flex flex-row justify-center gap-3 p-3 mt-3'>
            <Link to='/posts/addpost'>
              <button className='btn'>Create Post</button>
            </Link>
            <button className='btn' onClick={logout}>
              Logout
            </button>
          </div>
          <div className='grid h-1 grid-cols-2 grid-rows-2 gap-6 mb-3'>
            {/* {posts} */}
            <div className='mb-3'>
              <h1 className='m-2 text-2xl font-bold text-primary'>My Posts:</h1>
              {userData.posts.map((post, i) => {
                return (
                  <div
                    className='mb-3 card w-96 bg-primary text-primary-content'
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
                          <p>
                            Will Deliver: {post.willDeliver ? 'Yes' : 'No'}{' '}
                          </p>
                        </div>
                        <div className='justify-end card-actions'>
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
                        {post.messages.length > 0 && (
                          <div className='p-3 rounded bg-secondary'>
                            <h1 className='card-title'>Messages:</h1>
                            {post.messages.map((post, i) => {
                              return (
                                <div
                                  className='border-b border-style: solid'
                                  key={i}
                                >
                                  <div>
                                    <span className='font-extrabold font-xl'>
                                      {post.fromUser.username}:{' '}
                                    </span>
                                    {post.content}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div className='card-body'>
                          <input
                            className='m-3 input input-bordered text-secondary'
                            type='text'
                            name='content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                          <button
                            className='btn'
                            onClick={() => messages(post._id)}
                          >
                            Message
                          </button>
                        </div>
                      </div>
                    ) : (
                      'something here'
                    )}
                  </div>
                );
              })}
            </div>
            {/* { messages } */}
            <div>
              <h1 className='m-2 text-2xl font-bold text-primary'>Messages:</h1>
              {userData.messages.map((message, i) => {
                return (
                  <div
                    className='mb-3 card w-96 bg-primary text-primary-content'
                    key={i}
                  >
                    <div className='card-body'>
                      <h3 className='card-title text-neutral'>
                        Post: {message.post.title}
                      </h3>
                      <div className='p-2 bg-secondary'>
                        <p>
                          {message.fromUser.username}: {message.content}
                        </p>
                      </div>
                      {/* {currentUserID !== message.fromUser._id && (
                      <div className='justify-end card-actions'>
                        <Link to='/account/messages'>
                          <button
                            className='btn'
                            onClick={() => getPostID(message.post._id)}
                          >
                            Reply
                          </button>
                        </Link>
                      </div>
                    )} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
