const baseUrl = 'https://blog-platform.kata.academy/api';

export const fetchgetPosts = async (page) => {
  try {
    let url = await fetch(`${baseUrl}/articles?limit=${4}&offset=${page}`);
    let res = await url.json();
    return res;
  } catch (error) {
    alert('Ошибка при открытии поста');
    console.log(error);
  }
};

export const fetchGetPostSlug = async (slug) => {
  try {
    let url = await fetch(`${baseUrl}/articles/${slug}`);
    let res = await url.json();
    return res;
  } catch (error) {
    alert('Ошибка при открытии поста');
    console.log(error);
  }
};

export const createPost = async (value, token) => {
  console.log(value, token);
  try {
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
    res.url = url.status;
    return res;
  } catch (error) {
    alert('Ошибка при создании поста');
    console.log(error);
  }
};

export const editPost = async (value, slug, token) => {
  try {
    let user = {
      article: value,
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
    res.url = url.status;
    return res;
  } catch (error) {
    alert('Ошибка при редактировании поста');
    console.log(error);
  }
};

export const deletePost = async (slug, token) => {
  console.log(slug, token);
  try {
    let url = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log(url.status);
    let res = await url.json();
    res.url = url.status;
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (slug, token) => {
  try {
    let url = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
      method: 'POST',
      body: JSON.stringify(),
      headers: {
        Authorization: `Token ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let res = await url.json();
    res.url = url.status;
    return res;
  } catch (e) {
    alert('Ошибка при постановке лайка');
    console.log('My error', e);
  }
};

export const dislikePost = async (slug, token) => {
  try {
    let url = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    let res = await url.json();
    res.url = url.status;
    return res;
  } catch (e) {
    alert('Ошибка при постановке дизлайка');
    console.log('My error', e);
  }
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
    alert('Ошибка, пользователь с таким email уже существует');
    console.log('My error', e);
  }
};

export const singInUser = async (value) => {
  try {
    let user = {
      user: value,
    };
    let url = await fetch(`${baseUrl}/users/login`, {
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
    alert('Ошибка, такого пользователя не существует');
    console.log(e);
  }
};

export const editProfile = async (value, token) => {
  try {
    let user = {
      user: value,
    };
    console.log(user);
    let url = await fetch(`${baseUrl}/user`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        Authorization: `Token ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    let res = await url.json();
    res.url = url.status;
    return res;
  } catch (e) {
    if (e.response.status === 422) {
      alert('You are already subscribed to the plan');
    }
    console.log(e);
  }
};
