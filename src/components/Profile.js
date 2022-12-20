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
    <div className='flex justify-center items-center'>
      {userData === null ? (
        <h1>You are not logged in 🤨</h1>
      ) : (
        <div className='h-full'>
          <h1 className='text-2xl text-white font-bold m-2'>Profile</h1>
          <div className='bg-slate-800 text-slate-100 rounded p-2 m-2'>
            <div className='p-3 text-left'>
              <h3 className='text-center font-bold text-lg p-1'>
                👋 Welcome back, {userData.username}!
              </h3>
              <p>Username: {userData.username}</p>
              <p>User ID: {userData._id}</p>
              <p>Cohort: {userData.cohort}</p>
            </div>
          </div>
          <div>
            <Link to='/posts/addpost'>
              <button className='bg-slate-800 text-white p-2 m-2 rounded font-bold'>
                Create Post
              </button>
            </Link>
            <button
              className='bg-slate-800 text-white p-2 m-2 rounded font-bold'
              onClick={logout}
            >
              Logout
            </button>
          </div>

          <div>
            <h1>My Posts:</h1>
            {userData.posts.map((post, i) => {
              return (
                <div className='bg-slate-800 rounded' key={i}>
                  {post.active ? (
                    <div className='text-white justify-center m-3 p-3'>
                      <Link
                        to={`/posts/singlepost`}
                        onClick={() => sendPost(post)}
                      >
                        <h3 className='bg-white text-slate-800 rounded text-center h-15 p-1 font-bold'>
                          {post.title}
                        </h3>
                      </Link>
                      <div className='p-2'>
                        <p>{post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Location: {post.location}</p>
                        <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'} </p>
                      </div>
                      <Link to='/posts/editpost'>
                        <button
                          className='bg-slate-100 text-slate-800 p-2 m-2 rounded font-bold'
                          onClick={() => getPostID(post._id)}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className='bg-slate-100 text-slate-800 p-2 m-2 rounded font-bold'
                        onClick={() => deletePost(post._id, token)}
                      >
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
                <div className='bg-slate-800 rounded' key={i}>
                  <div className='text-white justify-center m-3 p-3'>
                    <h3 className='bg-white text-slate-800 rounded text-center h-15 font-bold'>
                      Message from: {message.fromUser.username}
                    </h3>
                    <div className='p-2'>
                      <p>From Post: {message.post.title}</p>
                      <p>Post ID: {message.post._id}</p>
                      <p>User: {message.fromUser.username}</p>
                      <p>Message: {message.content}</p>
                    </div>
                    {currentUserID !== message.fromUser._id ? (
                      <div>
                        <Link to='/account/messages'>
                          <button
                            className='bg-slate-100 text-slate-800 p-2 m-2 rounded font-bold'
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
