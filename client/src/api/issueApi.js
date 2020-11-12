import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function getIssues(params = null) {

  let issuesUrl = `${apiUrl}/issues`;

  if (params) {
    issuesUrl += '?';
    for (const prop in params) {
      issuesUrl +=`${prop}=${params[prop]}`;
    }
  }

  return axios({
    method: 'get',
    url: issuesUrl
  });
};
