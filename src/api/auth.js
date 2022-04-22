import axios from 'axios';

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/authentication/register/',
    data: user
  };

  const { data } = await axios.request(options);

  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/authentication/login/',
    data: credentials
  };

  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }
  return data.message;
};

export const credentials = async (token) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/authentication/credentials/',
    headers: { Authorization: `Bearer ${token}` }
  };
  const { data } = await axios.request(options);

  return data;
};

export const updateCollection = async (id, newCollection) => {
  const token = sessionStorage.getItem('token');

  const options = {
    method: 'PATCH',
    url: `http://localhost:8000/authentication/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: newCollection
  };
  const { data } = await axios.request(options);
  return data;
};
