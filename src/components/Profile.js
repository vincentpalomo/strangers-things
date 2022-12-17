import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIURL } from '..';

const Profile = ({ token, setOnline, setCurrentUserID, setPostID }) => {
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
        <>
          <h1>Profile</h1>
          <h3>👋 Welcome back, {userData.username}!</h3>
          <p>Username: {userData.username}</p>
          <p>User ID: {userData._id}</p>
          <p>Cohort: {userData.cohort}</p>
          <Link to='/addpost'>
            <button>Create Post</button>
          </Link>
          <div>
            {userData.posts.map((post, i) => {
              return (
                <div className='posts' key={i}>
                  {post.active ? (
                    <div>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <p>Price: {post.price}</p>
                      <p>Seller: {post.author.username}</p>
                      <p>Location: {post.location}</p>
                      <Link to='/editpost'>
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
            {userData.messages.map((message, i) => {
              return (
                <div className='messages' key={i}>
                  <h3>Messages</h3>
                  <p>From Post: {message.post.title}</p>
                  <p>Post ID: {message.post._id}</p>
                  <p>
                    {message.fromUser.username}: {message.content}
                  </p>
                  <button>Reply</button>
                </div>
              );
            })}
          </div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
