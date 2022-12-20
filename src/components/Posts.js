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

  // let searchPost render the page again with updating the post array

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
      <div className='flex justify-evenly p-3'>
        <h1 className='text-2xl text-white font-bold m-2'>POSTS</h1>
        {online === true ? (
          <Link to='/posts/addpost'>
            <button className='bg-slate-800 text-white p-2 m-2 rounded'>
              Create Post
            </button>
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
            className='p-2 rounded'
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className='bg-slate-800 text-white p-2 m-2 rounded'
            type='submit'
          >
            Search
          </button>
        </form>
      </div>
      <div className='grid gap-4 grid-cols-3 grid-rows-3 p-3'>
        {posts.filter(searchPost).map((post) => {
          return (
            <div className=' bg-slate-800 rounded' key={post._id}>
              {post.active ? (
                <div className='text-white justify-center m-3 p-1'>
                  <Link to={`/posts/singlepost`} onClick={() => sendPost(post)}>
                    <h3 className='bg-white text-slate-800 rounded text-center h-15 p-2 font-bold'>
                      {post.title}
                    </h3>
                  </Link>
                  <div className='p-1'>
                    <p>{post.description}</p>
                    <p>Price: {post.price}</p>
                    <p>Seller: {post.author.username}</p>
                    <p>Location: {post.location}</p>
                    <p>Will Deliver: {post.willDeliver ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
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
