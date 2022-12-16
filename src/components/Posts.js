import React, { useEffect, useState } from 'react';
import { APIURL } from '..';
import { Link } from 'react-router-dom';

const Posts = ({ token }) => {
  console.log(token);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch(`${APIURL}/POSTS`);
    const data = await res.json();
    console.log(data);
    const strangers = data.data;
    console.log(strangers.posts);
    setPosts(strangers.posts);
  };

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
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='posts-container'>
      <div>
        <h1>POSTS</h1>
        <Link to='/addpost'>
          <button className='btn'>Create Post</button>
        </Link>
      </div>

      <div>
        {posts.map((post) => {
          return (
            <div className='posts' key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <p>Seller: {post.author.username}</p>
              <p>Location: {post.location}</p>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
