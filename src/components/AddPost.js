import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
      console.error('error in addpost createpost fn', err);
    }
  };

  const previousPage = () => {
    history.goBack();
  };

  return (
    <div className='flex items-center justify-center p-12'>
      <div className='flex flex-col'>
        <h1 className='m-2 text-2xl font-bold text-primary'>Create Post 📃</h1>
        <button className='btn' onClick={previousPage}>
          Go back
        </button>
        <form className='w-full max-w-sm' onSubmit={createPost}>
          <div className='mb-1 md:flex md:items-center'>
            <div className='md:w-1/3'>
              <label
                className='block pr-4 mt-1 mb-1 font-bold md:text-right md:mb-0'
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
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className='mb-1 md:flex md:items-center'>
            <div className='md:w-1/3'>
              <label
                className='block pr-4 mb-1 font-bold md:text-right md:mb-0'
                htmlFor='description'
              >
                Description:
              </label>
              <div className='md:w-2/3'>
                <textarea
                  className='w-56 textarea textarea-bordered'
                  type='description'
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className='mb-1 md:flex md:items-center'>
            <div className='md:w-1/3'>
              <label
                className='block pr-4 mb-1 font-bold md:text-right md:mb-0'
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
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className='mb-1 md:flex md:items-center'>
            <div className='md:w-1/3'>
              <label
                className='block pr-4 mb-1 font-bold md:text-right md:mb-0'
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
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='mb-1 md:flex md:items-center'>
            <div className='mb-5'>
              <label
                className='block pr-4 mb-1 font-bold md:text-right md:mb-0'
                htmlFor='deliver'
              >
                <span>Will Deliver:</span>
                <input
                  className='m-1 checkbox checkbox-success'
                  type='checkbox'
                  name='deliver'
                  checked={deliver}
                  onChange={(e) => setDeliver(e.target.checked)}
                />
              </label>
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
