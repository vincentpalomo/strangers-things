import React, { useEffect, useState } from 'react';

const Posts = () => {
  const APIURL = `https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT`;

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
    <div className='posts'>
      <div>
        {posts.map((post) => {
          return (
            <div key={post._id}>
              <p>{post.title}</p>
              <p>{post.author.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
