const baseUrl = 'https://blog-platform.kata.academy/api';

export const fetchgetPosts = async (page) => {
  let url = await fetch(`${baseUrl}/articles?offset=${page}&limit=${4}`);
  let res = await url.json();
  // console.log(res);
  return res;
};

export const fetchGetPostSlug = async (slug) => {
  let url = await fetch(`${baseUrl}/articles/${slug}`);
  let res = await url.json();
  // console.log(res);
  return res;
};

export const createPost = async (value, token) => {
  console.log(value, token);
  let user = {
    article: value,
  };
  let url = await fetch(`https://blog-platform.kata.academy/api/articles`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Authorization: `Token ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let res = await url.json();
  console.log(res);
  return res;
};

export const editPost = async (slug, value, token) => {
  let user = {
    user: value,
  };
  let url = await fetch(`${baseUrl}/articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      Authorization: `Token ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let res = await url.json();
  console.log(res);
  return res;
};

export const deletePost = async (slug, token) => {
  let url = await fetch(`${baseUrl}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let res = await url.json();
  console.log(res);
  return res;
};

export const likePost = async (slug, token) => {
  let url = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
    method: 'POST',
    body: JSON.stringify(),
    headers: {
      Authorization: `Token ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let res = await url.json();
  console.log(res);
  return res;
};

export const dislikePost = async (slug, token) => {
  let url = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let res = await url.json();
  console.log(res);
  return res;
};

export const singUpUser = async (value) => {
  try {
    let user = {
      user: value,
    };

    let url = await fetch(`https://blog-platform.kata.academy/api/users`, {
      method: 'POST',

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(user),
    });

    let res = await url.json();

    if (res.user.token) {
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  } catch (e) {
    console.log('My error', e);
  }
};

export const singInUser = async (value) => {
  let user = {
    user: value,
  };
  let url = await fetch(`${baseUrl}/users/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  let res = await url.json();
  console.log(res);
  return res;
};

export const editProfile = async (value) => {
  let user = {
    value,
  };

  let url = await fetch(`${baseUrl}/user`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  let res = await url.json();
  console.log(res);
  return res;
};
