const API_URI = 'https://cockpit-production-abctotaal.herokuapp.com/overview.json';

const getOverview = (token) => {
  return new Promise((resolve, reject) => {
    let headers = new Headers({ 'Authorization': `Basic ${token}` });
    let succeed = json => { console.log('json', json); return resolve(json); }
    let fail = err => reject(err);
    let handle = response => {
      console.log('RES', response.status, response.statusText, response);
      if(response.ok) { return response.json().then(succeed, fail); }
      return fail(`${response.status}:${response.statusText}`);
    };
    return fetch(API_URI, { headers }).then(handle, fail);
  });
};

export default { getOverview };
