import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchEditPost } from '../api/api';

const EditPost = ({ token, postID, postData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [deliver, setDeliver] = useState(false);
  let history = useHistory();
  console.log(postData);

  const editPost = async (e) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setPrice('');
    setLocation('');
    setDeliver(false);

    try {
      const editPost = await fetchEditPost(
        token,
        postID,
        title,
        description,
        price,
        location,
        deliver
      );
      console.log(editPost);
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
  };

  const previousPage = () => {
    history.goBack();
  };

  return (
    <div className='editpost-container'>
      <h1>Edit Post 📃</h1>
      <button onClick={previousPage}>Go back</button>
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
