import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function signIn(data) {
  const { email, password } = data;

  return axios({
    method: 'post',
    url: 'http://localhost:3333/api/sessions',
    withCredentials: true,
    data: {
      email,
      password
    }
  });
}

export function checkAuth() {
  return axios({
    url: apiUrl + 'sessions',
    withCredentials: true
  });
}
