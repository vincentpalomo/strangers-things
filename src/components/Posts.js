import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, fetchDeletePost } from '../api/api';

const Posts = ({ token, currentUserID, online, setPostID, setPostData }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUserID === '') {
      return;
    }
    fetchPosts();
  }, [currentUserID]);

  useEffect(() => {
    if (token === '') {
      return;
    }
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const post = await fetchAllPosts();
      setPosts(post);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postID, token) => {
    try {
      const deletePost = await fetchDeletePost(postID, token);
      if (!deletePost.success) {
        alert(deletePost.error.message);
      }
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (postID) => {
    setPostID(postID);
  };

  const sendPost = async (post) => {
    setPostData(post);
  };

  return (
    <div className='posts-container'>
      <div>
        <h1>POSTS</h1>
        {online === true ? (
          <Link to='/posts/addpost'>
            <button className='btn'>Create Post</button>
          </Link>
        ) : null}
      </div>
      <div className='post-map'>
        {posts.map((post) => {
          return (
            <div className='posts' key={post._id}>
              {post.active ? (
                <div>
                  <Link to={`/posts/singlepost`} onClick={() => sendPost(post)}>
                    <h3>{post.title}</h3>
                  </Link>
                  <p>{post.description}</p>
                  <p>Price: {post.price}</p>
                  <p>Seller: {post.author.username}</p>
                  <p>Location: {post.location}</p>
                  <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
                  {post.author._id === currentUserID ? (
                    <Link to='/posts/editpost'>
                      <button onClick={() => editPost(post._id)}>Edit</button>
                    </Link>
                  ) : null}
                  {post.author._id === currentUserID ? (
                    <button onClick={() => deletePost(post._id, token)}>
                      Delete
                    </button>
                  ) : null}
                  {post.author._id !== currentUserID && online === true ? (
                    <Link to='/account/messages'>
                      <button onClick={() => editPost(post._id)}>
                        Message
                      </button>
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
