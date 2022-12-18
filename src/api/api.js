export const APIURL =
  'https://strangers-things.herokuapp.com/api/2209-FTB-CT-WEB-PT';

// fetch all posts
export const fetchAllPosts = async () => {
  const res = await fetch(`${APIURL}/POSTS`);
  const json = await res.json();
  return json.data.posts;
};

// delete post
export const fetchDeletePost = async (postID, token) => {
  const res = await fetch(`${APIURL}/posts/${postID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};
