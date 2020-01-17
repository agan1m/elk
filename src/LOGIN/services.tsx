import qs from 'qs';
import { get, post, setAccessToken } from './../common/Service';

export function setAuthToken(access_token: string) {
  setAccessToken(access_token);
}

export function logIn(data: any) {
  const { email, password } = data;

  return post('/login', { Email: email, Password: password });
}

export function certLogin(data: any) {
  return post('/certificateLogin2', data);
}

export function sendConfirmationCode(email: string) {
  return get(`/sendConfirmationCode/?email=${email}`);
}

export function confirmEmail(email: any, confirmationId: any, code: any) {
  return get(`/confirmEmail/?email=${email}&confirmationId=${confirmationId}&code=${code}`);
}

export function createAccount(data: any) {
  const { inn = '', kpp = '', email = '', thumbprint = '' } = data || {};

  return post(`/createaccount?inn=${inn}&email=${email}&kpp=${kpp}&thumbprint=${thumbprint}`, data);
}

export function getOrganizations(term: any) {
  return get(`/autocomplete/company/?${qs.stringify({ term }, { encode: true })}`);
}

export function getProfile() {
  return get('/getprofile');
}

export function getRequest(requestId: any) {
  return get(`/getrequest?requestId=${requestId}`);
}

export function getProductList() {
  return get('/getproductlist ');
}

export function getRequests() {
  return get('/getrequests');
}

export function resetPasswordConfirm(data: any) {
  return post('/resetpasswordconfirm', data);
}

export function restorePassword(data: any) {
  return post('/restorepassword', data);
}
