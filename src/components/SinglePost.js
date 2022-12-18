import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchDeletePost } from '../api/api';

const SinglePost = ({ token, postData, setPostID, currentUserID, online }) => {
  let post = postData;
  let history = useHistory();
  console.log(post);

  const deletePost = async (postID, token) => {
    try {
      const deletePost = await fetchDeletePost(postID, token);
      if (!deletePost.success) {
        alert(deletePost.error.message);
      }
      history.push('/posts');
    } catch (err) {
      console.error('something went wrong', err);
    }
  };

  const getPostID = async (postID) => {
    setPostID(postID);
  };

  const previousPage = () => {
    history.goBack();
  };
  return (
    <div className='singlepost-container'>
      <div className='posts'>
        <h3>{post.title}</h3>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Seller: {post.author.username}</p>
        <p>Location: {post.location}</p>
        <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
        {post.author._id === currentUserID ? (
          <Link to='/posts/editpost'>
            <button onClick={() => getPostID(post._id)}>Edit</button>
          </Link>
        ) : null}
        {post.author._id === currentUserID ? (
          <button onClick={() => deletePost(post._id, token)}>Delete</button>
        ) : null}
        {post.author._id !== currentUserID && online === true ? (
          <Link to='/account/messages'>
            <button onClick={() => getPostID(post._id)}>Message</button>
          </Link>
        ) : null}
        <button onClick={previousPage}>Go back</button>
      </div>
      <div>
        <h1>Messages:</h1>
        {post.messages.map((messages, i) => {
          return (
            <div className='messages' key={i}>
              <h3>Messages</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePost;
