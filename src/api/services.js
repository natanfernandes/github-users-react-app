import api from './index';

/**
 * Cria a instancia da api com o axios.
 * @param {string} username - o username do usuário a ser buscado
 */
export async function getGithubUserByUsername(username) {
  try {
    const response = await api.get(`/users/${username}`);
    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      data: error.response.data.message,
    };
  }
}

/**
 * Cria a instancia da api com o axios.
 * @param {string} username - o username do usuário a ser buscado os repos
 */
export async function getGithubUserRepositoriesByUsername(username) {
  try {
    const response = await api.get(`/users/${username}/repos`);
    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      data: error.response.data.message,
    };
  }
}
