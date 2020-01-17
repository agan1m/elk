import axios from 'axios';
import applyConverters from 'axios-case-converter';
import CookieUtil from '../helpers/CookieUtil';
import AppSettings from '../appSettings';
import { sendTokenEvent } from '../helpers/EventUtil';

const API_URL = AppSettings.getBaseUrl();

let instance: any;
let instancePost: any;

let auth_token: string;

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    CookieUtil.deleteCookie('Token');
    CookieUtil.deleteCookie('profile');
    sendTokenEvent('');
  }

  if (response.data) {
    const { Message, Error: error } = response.data;

    throw new Error(Message || error);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json().then((res: any) => {
    if (res) {
      throw res;
    } else {
      const error = new Error(response.statusText);

      throw error;
    }
  });
}

function getInitializedApiPost() {
  if (instancePost) return instancePost;

  return (instancePost = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  }));
}

function getInitializedApi() {
  if (instance) return instance;

  instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return applyConverters(instance);
}

function setProfileCookie(data: any) {
  const cookieData = JSON.parse(CookieUtil.getCookie('profile') || '{}');

  CookieUtil.setCookie('profile', JSON.stringify({ ...cookieData, ...data }));
}

export async function get(url: any) {
  const result = await getInitializedApi()
    .get(url, {
      headers: {
        Authorization: auth_token ? `Bearer ${auth_token}` : '',
      },
    })
    .then(checkStatus)
    .catch((error: any) => checkStatus(error.response));
  const { data: { TokenInfo = {} } = {} } = result || {};
  const { access_token } = TokenInfo;

  access_token && sendTokenEvent(access_token);

  return result.data;
}

export async function post(url: any, data: any) {
  const result = await getInitializedApiPost()
    .post(url, data, {
      headers: {
        Authorization: auth_token ? `Bearer ${auth_token}` : '',
      },
    })
    .then(checkStatus)
    .catch((error: any) => checkStatus(error.response));

  const { data: { TokenInfo = {}, AbonentInfo = {} } = {} } = result || {};
  const { access_token } = TokenInfo;
  const { Inn: inn, Kpp: kpp, ShortName: shortName, Email: email } = AbonentInfo;

  AbonentInfo && inn && setProfileCookie({ inn, kpp, shortName, email });
  access_token && CookieUtil.setToken(access_token, TokenInfo);
  access_token && sendTokenEvent(access_token);

  return result.data;
}

export function setAccessToken(access_token: string) {
  auth_token = access_token;
}
