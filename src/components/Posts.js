import React, { useEffect, useState } from 'react';
import { APIURL } from '..';
import { Link, Route } from 'react-router-dom';
import { fetchAllPosts } from '../api/api';

const Posts = ({ token, currentUserID, online, setPostID, setPostData }) => {
  // console.log(currentUserID);
  const [posts, setPosts] = useState([]);
  // console.log(token);

  useEffect(() => {
    // console.log('useeffect ran');
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
      console.log(post);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchPosts = async () => {
  //   const res = await fetch(`${APIURL}/POSTS`);
  //   const data = await res.json();
  //   console.log(data);
  //   const strangers = data.data;
  //   console.log(strangers.posts);
  //   setPosts(strangers.posts);
  // };

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
    // console.log(postID);
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
      {/* {post.active ? } */}
      <div className='post-map'>
        {posts.map((post) => {
          return (
            <div className='posts' key={post._id}>
              {post.active ? (
                <div>
                  <Link to={`/posts/singlepost`} onClick={() => sendPost(post)}>
                    <h3>{post.title}</h3>
                  </Link>
                  {/* <p>{post.description}</p>
                  <p>Price: {post.price}</p>
                  <p>Seller: {post.author.username}</p>
                  <p>Location: {post.location}</p>
                  <p>Will Deliver: {post.willDeliver ? 'yes' : 'no'}</p> */}
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
                      <button onClick={() => editPost(post._id)}>
                        Message
                      </button>
                    </Link>
                  ) : null}
                </div>
              ) : (
                'no'
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
