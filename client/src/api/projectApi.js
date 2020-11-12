
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function getProjects() {
  return axios({
    method: 'get',
    url: `${apiUrl}/projects`,
  });
}
