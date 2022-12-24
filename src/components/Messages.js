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

  const previousPage = () => {
    history.goBack();
  };
  return (
    <div className='min-h-screen hero'>
      <div className='text-center hero-content'>
        <div className='max-w-md'>
          <form onSubmit={messages}>
            <label htmlFor='content'>Send your message to the Seller </label>
            <textarea
              className='w-full m-3 textarea textarea-bordered'
              type='text'
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
