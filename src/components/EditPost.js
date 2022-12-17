import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIURL } from '..';

const EditPost = ({ token, postID }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [deliver, setDeliver] = useState(false);
  let history = useHistory();

  const editPost = async (e) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
    setDeliver(false);

    const res = await fetch(`${APIURL}/posts/${postID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title: `${title}`,
          description: `${description}`,
          price: `${price}`,
          location: `${location}`,
          willDeliver: `${deliver}`,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        history.goBack();
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

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleDeliver = (e) => {
    setDeliver(e.target.checked);
    console.log(e);
  };
  return (
    <div className='editpost-container'>
      <h1>Edit Post 📃</h1>
      <Link to='/posts'>
        <button className='btn'>Go back</button>
      </Link>
      <form onSubmit={editPost}>
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
        <label htmlFor='location'>location</label>
        <input
          type='text'
          name='location'
          value={location}
          onChange={handleLocation}
        />
        <label htmlFor='deliver'>deliver</label>
        <input
          type='checkbox'
          name='deliver'
          checked={deliver}
          onChange={handleDeliver}
        />
        <button type='submit'>Edit Post</button>
      </form>
    </div>
  );
};

export default EditPost;
