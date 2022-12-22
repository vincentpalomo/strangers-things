import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchMessages } from '../api/api';

const Messages = ({ token, postID }) => {
  const [content, setContent] = useState('');
  let history = useHistory();

  const messages = async (e) => {
    e.preventDefault();
    setContent('');

    try {
      const messages = await fetchMessages(token, postID, content);
      console.log(messages);
      history.goBack();
    } catch (err) {
      console.error('error in messages message fn', err);
    }
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
