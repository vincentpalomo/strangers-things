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
    <div className='message-container'>
      <button onClick={previousPage}>Go back</button>
      <form onSubmit={messages}>
        <label htmlFor='content'>Send your message to the Seller </label>
        <input
          type='text'
          name='content'
          value={content}
          onChange={handleContent}
          required
        />
        <button type='submit'>Reply</button>
      </form>
    </div>
  );
};

export default Messages;
