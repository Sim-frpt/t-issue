import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const issuesUrl = `${apiUrl}/issues`;

export function getIssues(params = null) {
  let url = issuesUrl;

  if (params) {
    url += '?';
    for (const prop in params) {
      if (Array.isArray(params[prop])) {
        for (let element of params[prop]) {
          url += `${prop}=${element}&`;
        }
      } else {
        url +=`${prop}=${params[prop]}&`;
      }
    }
  }

  // Remove the last '&' at the end of the query
  if (url.endsWith('&')) {
    url = url.slice(0, -1);
  }

  return axios({
    method: 'get',
    url: issuesUrl
  });
};

export function getIssuePriorities() {

  return axios({
    method: 'get',
    url: `${apiUrl}/priorities`
  });
}

export function getIssueStatus() {

  return axios({
    method: 'get',
    url: `${apiUrl}/status`
  });
}

export function getIssueTags() {

  return axios({
    method: 'get',
    url: `${apiUrl}/tags`
  });
}
