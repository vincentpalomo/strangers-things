import React, { useEffect, useState } from 'react';

const Posts = ({ APIURL }) => {
  // const APIURL = `https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT`;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(`${APIURL}/POSTS`);
    const data = await res.json();
    const strangers = data.data;
    console.log(strangers.posts);
    setPosts(strangers.posts);
  };
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
