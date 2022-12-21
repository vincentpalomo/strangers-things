import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { APIURL } from '..';

const Messages = ({ token, currentUserID, postID }) => {
  // console.log('post id:', postID);
  // console.log('current user id:', currentUserID);
  const [content, setContent] = useState('');
  let history = useHistory();

  const messages = async (e) => {
    e.preventDefault();
    setContent('');

    const res = await fetch(`${APIURL}/posts/${postID}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: `${content}`,
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

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const previousPage = () => {
    history.goBack();
  };
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <form onSubmit={messages}>
            <label htmlFor='content'>Send your message to the Seller </label>
            <input
              className='input input-bordered m-3'
              type='text'
              name='content'
              value={content}
              onChange={handleContent}
            />
            <div className='flex flex-row justify-center gap-6'>
              <button className='btn btn-primary' type='submit'>
                Reply
              </button>
            </div>
          </form>
          <span>
            <button className='btn btn-primary' onClick={previousPage}>
              Go back
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
