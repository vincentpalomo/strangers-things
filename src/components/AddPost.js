import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
      console.log(createPost);
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
    <div className='flex justify-center items-center'>
      <div className='flex flex-col'>
        <h1 className='text-2xl text-white font-bold m-2'>Create Post 📃</h1>
        <button className='btn' onClick={previousPage}>
          Go back
        </button>
        <form className='w-full max-w-sm' onSubmit={createPost}>
          <div className='md:flex md:items-center mb-1'>
            <div className='md:w-1/3'>
              <label
                className='block font-bold mt-1 md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='title'
              >
                Title:
              </label>

              <div className='md:w-2/3'>
                <input
                  className='input input-bordered'
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleTitle}
                  required
                />
              </div>
            </div>
          </div>
          <div className='md:flex md:items-center mb-1'>
            <div className='md:w-1/3'>
              <label
                className='block font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='description'
              >
                Description:
              </label>
              <div className='md:w-2/3'>
                <input
                  className='input input-bordered'
                  type='description'
                  name='description'
                  value={description}
                  onChange={handleDescription}
                  required
                />
              </div>
            </div>
          </div>
          <div className='md:flex md:items-center mb-1'>
            <div className='md:w-1/3'>
              <label
                className='block font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='price'
              >
                Price:
              </label>
              <div className='md:w-2/3'>
                <input
                  className='input input-bordered'
                  type='text'
                  name='price'
                  value={price}
                  onChange={handlePrice}
                  required
                />
              </div>
            </div>
          </div>
          <div className='md:flex md:items-center mb-1'>
            <div className='md:w-1/3'>
              <label
                className='block font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='location'
              >
                Location:
              </label>
              <div className='md:w-2/3'>
                <input
                  className='input input-bordered'
                  type='text'
                  name='location'
                  value={location}
                  onChange={handleLocation}
                />
              </div>
            </div>
          </div>
          <div className='md:flex md:items-center mb-1'>
            <div className='md:w-1/3'>
              <label
                className='block font-bold md:text-right mb-1 md:mb-0 pr-4'
                htmlFor='deliver'
              >
                Deliver:
              </label>
              <div className='md:w-2/3 content-center'>
                <span class='text-center'>Check for Yes</span>
                <input
                  className='checkbox checkbox-success'
                  type='checkbox'
                  name='deliver'
                  checked={deliver}
                  onChange={handleDeliver}
                />
              </div>
            </div>
          </div>
          <button className='btn md:w-full' type='submit'>
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
