import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function signIn(data) {
  const { email, password } = data;

  return axios({
    method: 'post',
    url: `${apiUrl}/sessions`,
    withCredentials: true,
    data: {
      email,
      password
    }
  });
}

export function signOut() {
  return axios({
    method: 'delete',
    url: `${apiUrl}/sessions`,
    withCredentials: true
  });
}

export function checkAuth() {
  return axios({
    url: `${apiUrl}/sessions`,
    withCredentials: true
  });
}
