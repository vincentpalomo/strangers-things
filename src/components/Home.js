import React from 'react';

const Home = () => {
  return (
    <div className='h-full hero'>
      <div className='text-center hero-content'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold text-primary'>
            Welcome to Stranger's Things
          </h2>
          <p className='py-6'>
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
