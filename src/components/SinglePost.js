import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchDeletePost } from '../api/api';

const SinglePost = ({ token, postData, setPostID, currentUserID, online }) => {
  let post = postData;
  let history = useHistory();

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
    <div className='flex justify-center items-center'>
      <div className='flex flex-col pt-20'>
        <div className='bg-slate-800 rounded p-3 text-slate-100'>
          <h3 className='bg-white text-slate-800 rounded text-center h-15 p-2 font-bold'>
            {post.title}
          </h3>
          <div className='p-1'>
            <p>Description: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Seller: {post.author.username}</p>
            <p>Location: {post.location}</p>
            <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
          </div>
          {post.author._id === currentUserID ? (
            <Link to='/posts/editpost'>
              <button
                className='bg-slate-100 text-slate-800 p-2 m-2 rounded'
                onClick={() => getPostID(post._id)}
              >
                Edit
              </button>
            </Link>
          ) : null}
          {post.author._id === currentUserID ? (
            <button
              className='bg-slate-100 text-slate-800 p-2 m-2 rounded'
              onClick={() => deletePost(post._id, token)}
            >
              Delete
            </button>
          ) : null}
          {post.author._id !== currentUserID && online === true ? (
            <Link to='/account/messages'>
              <button
                className='bg-slate-100 text-slate-800 p-2 m-2 rounded'
                onClick={() => getPostID(post._id)}
              >
                Message
              </button>
            </Link>
          ) : null}
          <button
            className='bg-slate-100 text-slate-800 p-2 m-2 rounded'
            onClick={previousPage}
          >
            Go back
          </button>
        </div>
        <div className='bg-slate-800 rounded p-3 text-white'>
          <h1>Messages:</h1>
          {post.messages.map((message, i) => {
            return (
              <div className='messages' key={i}>
                <h3 className='bg-white text-slate-800 rounded text-center h-15 p-2 font-bold'>
                  Message from: {message.fromUser.username}
                </h3>
                <div className='p-1'>
                  <p>Content: {message.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
