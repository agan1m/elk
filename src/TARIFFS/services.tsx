import qs from 'qs';
import { get, post, setAccessToken } from './../common/Service';

export function setAuthToken(access_token: string) {
  setAccessToken(access_token);
}

export function getTariffs(regionCode: any, productType: any) {
  return get(`/gettariffs/?regionCode=${regionCode}&productType=${productType}`);
}

export function getAccountData(inn: any, useCert: any) {
  return get(`/getaccountdata/?inn=${inn}&useCertificate=${useCert}`);
}

export function sendConfirmationCode(email: any) {
  return get(`/sendConfirmationCode/?email=${email}`);
}

export function confirmEmail(email: any, confirmationId: any, code: any) {
  return get(`/confirmEmail/?email=${email}&confirmationId=${confirmationId}&code=${code}`);
}

export function generatePdfLink(data: any) {
  return post('/generatepdflink', data);
}

export function createRequest(data: any) {
  return post('/createrequest', data);
}

export function createFilerRequest(data: any) {
  return post('/createfilerrequest', data);
}

export function getAgents(regionCode: any, productType: any, abonentType: any) {
  return get(`/getagents/?regionCode=${regionCode}&productType=${productType}&abonentType=${abonentType}`);
}

export function getAllAgents(productType: any, abonentType: any) {
  return get(`/getallagents/?productType=${productType}&abonentType=${abonentType}`);
}

export function getOrganizations(term: any) {
  return get(`/autocomplete/company/?${qs.stringify({ term }, { encode: true })}`);
}

export function getTotalPrice(data: any) {
  return post('/gettotalprice', data);
}

export function createAccount(data: any) {
  const { inn = '', kpp = '', email = '' } = data || {};

  return post(`/createaccount?inn=${inn}&email=${email}&kpp=${kpp}`, data);
}

export function getAddress(data: any) {
  return get(`/getaddresses?term=${data.term}`);
}

export function getProfile() {
  return get('/getprofile');
}
