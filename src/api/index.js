import axios from 'axios';
/**
 * Cria a instancia da api com o axios.
 * @param {string} baseURL - a url da api que utilizaremos.
 */
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
