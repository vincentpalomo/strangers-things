import React, { useEffect, useState } from 'react';
import { AddPost } from './AddPost';

const Posts = ({ APIURL }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch(`${APIURL}/POSTS`);
    const data = await res.json();
    console.log(data);
    const strangers = data.data;
    console.log(strangers.posts);
    setPosts(strangers.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='posts-container'>
      <h1>POSTS</h1>
      <div>
        {posts.map((post) => {
          return (
            <div className='posts' key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <p>Seller: {post.author.username}</p>
              <p>Location: {post.location}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
