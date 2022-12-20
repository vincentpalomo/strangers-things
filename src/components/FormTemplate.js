import React from 'react';

const FormTemplate = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='mt-3'>
        <form>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Title'
              className='input input-bordered'
            />
          </div>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Description'
              className='input input-bordered'
            />
          </div>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Price'
              className='input input-bordered'
            />
          </div>
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Location'
              className='input input-bordered'
            />
          </div>
          <div className='mb-6'>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <span className='label-text'>Will Deliver: </span>
                <input type='checkbox' className='checkbox checkbox-success' />
              </label>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='
                        w-full
                        text-white
                        bg-primary
                        rounded
                        border border-primary
                        p-3
                        transition
                        hover:bg-opacity-90
                        '
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTemplate;
