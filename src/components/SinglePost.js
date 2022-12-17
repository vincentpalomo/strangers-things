import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const SinglePost = ({ token, postData, setPostID, currentUserID, online }) => {
  let post = postData;
  let history = useHistory();

  const deletePost = async (postID) => {
    console.log(postID);
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
        fetchPosts();
      })
      .catch(console.error);
  };

  const editPost = async (postID) => {
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
        <p>Will Deliver: {post.willDeliver ? 'yes' : 'no'}</p>
        {post.author._id === currentUserID ? (
          <Link to='/posts/editpost'>
            <button onClick={() => editPost(post._id)}>Edit</button>
          </Link>
        ) : null}
        {post.author._id === currentUserID ? (
          <button onClick={() => deletePost(post._id)}>Delete</button>
        ) : null}
        {post.author._id !== currentUserID && online === true ? (
          <Link to='/account/messages'>
            <button onClick={() => editPost(post._id)}>Message</button>
          </Link>
        ) : null}
        <button onClick={previousPage}>Go back</button>
      </div>
    </div>
  );
};

export default SinglePost;
