import React from 'react';

const Search = ({ posts, setSearchResults }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(posts);
    const resultArray = posts.filter(
      (post) =>
        post.title.includes(e.target.value) ||
        post.description.includes(e.target.value)
    );
    setSearchResults(resultArray);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' id='search' onChange={handleSearchChange} />
      </form>
      <button>Search</button>
    </div>
  );
};

export default Search;
