import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export function getIssues(params = null) {

  let issuesUrl = `${apiUrl}/issues`;

  if (params) {
    issuesUrl += '?';
    for (const prop in params) {
      if (Array.isArray(params[prop])) {
        for (let element of params[prop]) {
          issuesUrl += `${prop}=${element}&`;
        }
      } else {
        issuesUrl +=`${prop}=${params[prop]}&`;
      }
    }
  }

  // Remove the last '&' at the end of the query
  if (issuesUrl.endsWith('&')) {
    issuesUrl = issuesUrl.slice(0, -1);
  }

  return axios({
    method: 'get',
    url: issuesUrl
  });
};
