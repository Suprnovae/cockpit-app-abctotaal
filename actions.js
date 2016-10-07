export const LOAD_RECORD = 'LOAD_RECORD';
export const SAVE_RECORD = 'SAVE_RECORD';
export const REQUEST_REPORT = 'LOAD_REPORT';
export const SAVE_REPORT = 'SAVE_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const CLEAR_REPORT = 'CLEAR_REPORT';
export const UPDATE_CREDENTIALS = 'UPDATE_CREDS';

import { AsyncStorage } from 'react-native';
import api from './api';

// NOTE: Often I will get or fetch some information asyncronously, to call an
// update action on success upon which the application state is mutated.
export function addRecord(price, currency = 'XTS', description, category, image, datetime = (new Date).toISOString()) {
  return {
    type: SAVE_RECORD,
    content: {
      price: {
        currency: currency,
        value: price,
      },
      description: description,
      datetime: datetime,
      attachment: image,
      category: category,
    }
  };
};

export function requestReport() {
  console.log('requestReport');
  return {
    type: REQUEST_REPORT,
  }
};

// update state (sync)
export function updateReport(report) {
  console.log('updateReport');
  return {
    type: UPDATE_REPORT,
    report,
  }
};

// persist to storage (async)
export function saveReport(content) {
  return (dispatch, getState) => {
    console.log('updated at', content.updated_at);
    const data = {
      organization: {
        shortname: content.shortname,
        name: content.organization,
      },
      comment: content.comment,
      updatedAt: Date.parse(content.updated_at),
      receivedAt: Date.now(),
      data: content.data,
    };

    const show = _ => dispatch(updateReport(data));
    const fail = reason => Promise.reject(reason);

    AsyncStorage.setItem('report', JSON.stringify(data)).then(show, fail);
  }
};

// get report from local storage (async)
export function getReport() {
  return (dispatch, getState) => {
    let fail = err => {
      console.log('get from async storage failed', err);
      return Promise.reject();
    }

    let show = res => {
      try {
        let parsed = JSON.parse(res);
        console.log('loaded report', parsed);
        return dispatch(updateReport(parsed));
      } catch(e) {
        console.log('parsing report from Async failed', e.message);
        return Promise.reject();
      }
    }

    return AsyncStorage.getItem('report').then(show, fail);
  }
}

// fetch from source (async)
export function fetchReport() {
  return (dispatch, getState) => api.getOverview(getState().auth.token);
};

// clear report in state (sync)
export function clearReport(payload) {
  console.log('clearReport', payload);
  return { type: CLEAR_REPORT, content: {} };
};

// update auth creds state (sync)
export function updateBasicAuthCredentials(handle, secret) {
  return { type: UPDATE_CREDENTIALS, handle, secret };
};

// save auth creds (async)
export function saveBasicAuthCredentials(handle, secret) {
  const data = JSON.stringify({ basic: { handle, secret } });
  let key = 'creds_basic';

  return (dispatch, getState) => {
    let get  = _ => dispatch(updateBasicAuthCredentials(handle, secret));
    let fail = _ => Promise.reject();
    return AsyncStorage.setItem(key, data).then(get, fail);
  }
};

export function authenticate(handle, secret) {
  return (dispatch, getState) => {
    let fetch = _ => dispatch(fetchReport());
    let persist = latest => dispatch(saveReport(latest));
    let fail = err => Promise.reject(err);
    return dispatch(saveBasicAuthCredentials(handle, secret))
      .then(fetch, fail)
      .then(persist, fail);
  };
};
