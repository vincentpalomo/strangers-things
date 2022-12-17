import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIURL } from '..';

const AddPost = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [deliver, setDeliver] = useState(false);
  let history = useHistory();

  const createPost = async (e) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
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

  const previousPage = () => {
    history.goBack();
  };

  return (
    <div className='addpost-container'>
      <h1>Create Post 📃</h1>
      <button onClick={previousPage}>Go back</button>
      <form onSubmit={createPost}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={handleTitle}
          required
        />
        <label htmlFor='description'>description</label>
        <input
          type='description'
          name='description'
          value={description}
          onChange={handleDescription}
          required
        />
        <label htmlFor='price'>price</label>
        <input
          type='text'
          name='price'
          value={price}
          onChange={handlePrice}
          required
        />
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
        <button type='submit'>Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
