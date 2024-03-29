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

  const previousPage = () => {
    history.goBack();
  };

  return (
    <div className='flex items-center justify-center p-12'>
      <div className='flex flex-col'>
        <h1 className='m-2 text-2xl font-bold text-primary'>Edit Post 📃</h1>
        <button className='btn' onClick={previousPage}>
          Go back
        </button>
        <form className='w-full max-w-sm' onSubmit={editPost}>
          <div className='mb-1 md:flex md:items-center'>
            <div className='md:w-1/3'>
              <label
                className='block pr-4 mt-1 mb-1 font-bold md:text-left md:mb-0'
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
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='mb-5'>
            <label
              className='block pr-4 mt-1 mb-1 font-bold md:text-left md:mb-0'
              htmlFor='description'
            >
              Description:
            </label>
            <textarea
              className='w-56 textarea textarea-bordered'
              type='description'
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='mb-5'>
            <label
              className='block pr-4 mt-1 mb-1 font-bold md:text-left md:mb-0'
              htmlFor='price'
            >
              Price:
            </label>
            <input
              className='input input-bordered'
              type='text'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className='mb-5'>
              <label
                className='block pr-4 mt-1 mb-1 font-bold md:text-left md:mb-0'
                htmlFor='location'
              >
                Location:
              </label>
              <input
                className='input input-bordered'
                type='text'
                name='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className='mb-5'>
            <label
              className='block pr-4 mt-1 mb-1 font-bold md:text-left md:mb-0'
              htmlFor='deliver'
            >
              <span>Will Deliver: </span>
              <input
                className='checkbox checkbox-success'
                type='checkbox'
                name='deliver'
                checked={deliver}
                onChange={(e) => setDeliver(e.target.checked)}
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
