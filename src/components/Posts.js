import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, fetchDeletePost } from '../api/api';

const Posts = ({ token, currentUserID, online, setPostID, setPostData }) => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const searchPost = (post) => {
    return (
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      post.price.toLowerCase().includes(searchQuery)
    );
  };

  const fetchPosts = async () => {
    try {
      const post = await fetchAllPosts();
      setPosts(post);
    } catch (error) {
      console.error('error in post fetchpost fn', error);
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
      console.error('error in post delete fn', error);
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
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-evenly p-3 w-full mt-3'>
        <h1 className='text-2xl text-white font-bold m-2'>POSTS</h1>
        {online === true ? (
          <Link to='/posts/addpost'>
            <button className='btn'>Create Post</button>
          </Link>
        ) : null}
        <form
          id='search'
          onSubmit={async (e) => {
            e.preventDefault();
            await searchPost(searchQuery);
          }}
        >
          <input
            className='input input-bordered input-primary'
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='btn m-3' type='submit'>
            Search
          </button>
        </form>
      </div>
      <div className='grid gap-4 grid-cols-3 grid-rows-3 mb-3'>
        {posts.filter(searchPost).map((post) => {
          return (
            <div
              className='card w-96 bg-primary text-primary-content'
              key={post._id}
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
                  <div className='p-1'>
                    {/* <p>{post.description}</p> */}
                    <p>Price: {post.price}</p>
                    {/* <p>Seller: {post.author.username}</p>
                    <p>Location: {post.location}</p>
                    <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p> */}
                  </div>
                  <div className='card-actions justify-end'>
                    {post.author._id === currentUserID ? (
                      <Link to='/posts/editpost'>
                        <button
                          className='btn'
                          onClick={() => getPostID(post._id, post)}
                        >
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
                        <button
                          className='btn'
                          onClick={() => getPostID(post._id)}
                        >
                          Message
                        </button>
                      </Link>
                    ) : null}
                  </div>
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
