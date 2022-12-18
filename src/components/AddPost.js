import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { APIURL } from '..';
import { fetchAddPost } from '../api/api';

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

    try {
      const createPost = await fetchAddPost(
        token,
        title,
        description,
        price,
        location,
        deliver
      );
      history.goBack();
    } catch (err) {
      console.error('something went wrong', err);
    }
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
        <label htmlFor='description'>Description</label>
        <input
          type='description'
          name='description'
          value={description}
          onChange={handleDescription}
          required
        />
        <label htmlFor='price'>Price</label>
        <input
          type='text'
          name='price'
          value={price}
          onChange={handlePrice}
          required
        />
        <label htmlFor='location'>Location</label>
        <input
          type='text'
          name='location'
          value={location}
          onChange={handleLocation}
        />
        <label htmlFor='deliver'>Will Deliver</label>
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
