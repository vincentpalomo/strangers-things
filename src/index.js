import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './components/Posts';

const App = () => {
  return (
    <>
      <div className='app'>
        <Posts />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
