import React from 'react';

const Home = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='max-w-sm text-center'>
        <div className='flex flex-col space-y-12'>
          <h2 className='max-w text-4xl font-bold text-center'>
            Welcome to Stranger's Things
          </h2>
          <p className='max-w text-center text-darkGrayishBlue md:text-left'>
            Got something to sell or want something to buy? {'\n'}
            Looking for a place to live? {'\n'}
            Find everything you need here! 👽
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
