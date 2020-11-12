import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function getUserProjects(id) {
  return axios({
    method: 'get',
    url: `${apiUrl}/users/${id}/projects`
  });
}
