import React, { useEffect, useState } from 'react';

const AddPost = ({ APIURL, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [deliver, setDeliver] = useState(false);

  const createPost = async (e) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setPrice('');
    setDeliver(false);

    const res = await fetch(`${APIURL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: `${title}`,
          description: `${description}`,
          price: `${price}`,
          willDeliver: `${deliver}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleDeliver = (e) => {
    setDeliver(e.target.checked);
    console.log(e);
  };

  return (
    <div className='addpost-container'>
      <h1>Login</h1>
      <form onSubmit={createPost}>
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />
        <label htmlFor='description'>description</label>
        <input
          type='description'
          name='description'
          value={description}
          onChange={handleDescription}
        />
        <label htmlFor='price'>price</label>
        <input type='text' name='price' value={price} onChange={handlePrice} />
        <label htmlFor='deliver'>deliver</label>
        <input
          type='checkbox'
          name='deliver'
          checked={deliver}
          onChange={handleDeliver}
        />
        <button type='submit'>Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
