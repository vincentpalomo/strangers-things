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
      console.error('error in singlepost delete fn', err);
    }
  };

  const getPostID = async (postID) => {
    setPostID(postID);
  };

  const previousPage = () => {
    history.goBack();
  };
  return (
    <div className='flex justify-center items-center my-10'>
      <div className='card w-1/3 bg-primary text-primary-content'>
        <div className='card-body'>
          <h3 className='card-title text-neutral text-2xl'>{post.title}</h3>
          <div className='p-1 text-neutral text-base'>
            <p>Description: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Seller: {post.author.username}</p>
            <p>Location: {post.location}</p>
            <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
          </div>
          <div className='card-actions justify-end'>
            {post.author._id === currentUserID ? (
              <Link to='/posts/editpost'>
                <button className='btn' onClick={() => getPostID(post._id)}>
                  Edit
                </button>
              </Link>
            ) : null}
            {post.author._id === currentUserID ? (
              <button
                className='btn'
                onClick={() => deletePost(post._id, token)}
              >
                Delete
              </button>
            ) : null}
            {post.author._id !== currentUserID && online === true ? (
              <Link to='/account/messages'>
                <button className='btn' onClick={() => getPostID(post._id)}>
                  Message
                </button>
              </Link>
            ) : null}
            <button className='btn' onClick={previousPage}>
              Go back
            </button>
          </div>
          {online === true && post.messages.length > 0 ? (
            <div className='bg-secondary rounded p-3 text-slate-800'>
              {post.messages.map((message, i) => {
                return (
                  <div className='card-body' key={i}>
                    <h3 className='card-title'>
                      Message from: {message.fromUser.username}
                    </h3>
                    <div className='p-1'>
                      <p>Content: {message.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
