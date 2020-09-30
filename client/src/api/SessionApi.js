import axios from 'axios';

export async function signIn(data) {
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
