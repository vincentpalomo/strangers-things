import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, fetchDeletePost } from '../api/api';

const Posts = ({ token, currentUserID, online, setPostID, setPostData }) => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);

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

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    searchPost(searchQuery);
  }, [searchQuery]);

  // let searchPost render the page again with updating the post array

  const searchPost = async (searchQuery, posts) => {
    console.log(searchQuery, posts);
    try {
      const searchPost = await fetchAllPosts(searchQuery);
      console.log(searchPost);
    } catch (err) {
      console.error('something went wrong', err);
    }
  };

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

  const getPostID = async (postID) => {
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
        <form
          id='search'
          onSubmit={async (e) => {
            e.preventDefault();
            await searchPost(searchQuery, posts);
          }}
        >
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className='grid gap-4 grid-cols-3 grid-rows-3'>
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
                      <button onClick={() => getPostID(post._id)}>Edit</button>
                    </Link>
                  ) : null}
                  {post.author._id === currentUserID ? (
                    <button onClick={() => deletePost(post._id, token)}>
                      Delete
                    </button>
                  ) : null}
                  {post.author._id !== currentUserID && online === true ? (
                    <Link to='/account/messages'>
                      <button onClick={() => getPostID(post._id)}>
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
