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

// add post
export const fetchAddPost = async (
  token,
  title,
  description,
  price,
  location,
  deliver
) => {
  const res = await fetch(`${APIURL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: `${title}`,
        description: `${description}`,
        price: `${price}`,
        location: `${location}`,
        willDeliver: `${deliver}`,
      },
    }),
  });
  const json = res.json();
  return json;
};

// edit post
export const fetchEditPost = async (
  token,
  postID,
  title,
  description,
  price,
  location,
  deliver
) => {
  const res = await fetch(`${APIURL}/posts/${postID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: `${title}`,
        description: `${description}`,
        price: `${price}`,
        location: `${location}`,
        willDeliver: `${deliver}`,
      },
    }),
  });
  const json = await res.json();
  return json;
};

// login
export const fetchLogin = async (username, password) => {
  const res = await fetch(`${APIURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: `${username}`,
        password: `${password}`,
      },
    }),
  });
  const json = await res.json();
  return json;
};

// register
export const fetchRegister = async (username, password) => {
  const res = await fetch(`${APIURL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username: `${username}`,
        password: `${password}`,
      },
    }),
  });
  const json = await res.json();
  return json;
};

// logged in user
export const fetchLoggedInUser = async (token) => {
  const res = await fetch(`${APIURL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();
  return json;
};
