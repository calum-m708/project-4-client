import axios from 'axios';

//baseUrl is http://localhost:8000

export const getAllCards = async () => {
  console.log('working');
  const options = {
    method: 'GET',
    url: 'http://localhost:8000/cards/'
  };

  const { data } = await axios.request(options);
  return data;
};

export const getCardById = async (id) => {
  const options = {
    method: 'GET',
    url: `http://localhost:8000/cards/${id}`
  };
  const { data } = await axios.request(options);

  return data;
};

export const createCard = async (card) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/cards/',
    data: card
    // headers: {
    //   authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    // }
  };
  const { data } = await axios.request(options);

  return data;
};
