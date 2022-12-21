import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchEditPost } from '../api/api';

const EditPost = ({ token, postID, postData }) => {
  const [title, setTitle] = useState(postData.title);
  const [description, setDescription] = useState(postData.description);
  const [price, setPrice] = useState(postData.price);
  const [location, setLocation] = useState(postData.location);
  const [deliver, setDeliver] = useState(postData.willDeliver);
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
      console.error('error in edit post edit fn', err);
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
    <div className='flex items-center justify-center p-12'>
      <div className='flex flex-col'>
        <h1 className='text-2xl text-white font-bold m-2'>Edit Post 📃</h1>
        <button className='btn' onClick={previousPage}>
          Go back
        </button>
        <form className='w-full max-w-sm' onSubmit={editPost}>
          <div className='md:flex md:items-center mb-1'>
            <div className='md:w-1/3'>
              <label
                className='block font-bold mt-1 md:text-left mb-1 md:mb-0 pr-4'
                htmlFor='title'
              >
                Title:
              </label>
              <div className='md:2/3'>
                <input
                  className='input input-bordered'
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleTitle}
                />
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <label
              className='block font-bold mt-1 md:text-left mb-1 md:mb-0 pr-4'
              htmlFor='description'
            >
              Description:
            </label>
            <input
              className='input input-bordered'
              type='description'
              name='description'
              value={description}
              onChange={handleDescription}
            />
          </div>
          <div className='mb-5'>
            <label
              className='block font-bold mt-1 md:text-left mb-1 md:mb-0 pr-4'
              htmlFor='price'
            >
              Price:
            </label>
            <input
              className='input input-bordered'
              type='text'
              name='price'
              value={price}
              onChange={handlePrice}
            />
            <div className='mb-5'>
              <label
                className='block font-bold mt-1 md:text-left mb-1 md:mb-0 pr-4'
                htmlFor='location'
              >
                Location:
              </label>
              <input
                className='input input-bordered'
                type='text'
                name='location'
                value={location}
                onChange={handleLocation}
              />
            </div>
          </div>
          <div className='mb-5'>
            <label
              className='block font-bold mt-1 md:text-left mb-1 md:mb-0 pr-4'
              htmlFor='deliver'
            >
              <span>Will Deliver:</span>
              <input
                className='checkbox checkbox-success'
                type='checkbox'
                name='deliver'
                checked={deliver}
                onChange={handleDeliver}
              />
            </label>
          </div>
          <button className='btn md:w-full' type='submit'>
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
