import { IRequest, IState } from './Interfaces';
import { createRequest, createFilerRequest } from './../../services';
import { TYPE } from './../../../constants';

function _getPersonFullName(surname: string, name: string, lastname?: string) {
  return `${surname} ${name}${lastname ? ` ${lastname}` : ''}`;
}

function _getSelectedTariff(tariff: any, regionCode: number) {
  const { name, isSpecialMode, paymentPeriod, price, numberOfDocuments } = tariff;

  return {
    Price: price,
    Name: name,
    IsSpecialMode: isSpecialMode,
    Region: regionCode,
    TariffPaymentPeriodType: paymentPeriod,
    NumberOfDocuments: numberOfDocuments,
  };
}

function _getMethodRequestByType(type: number) {
  switch (type) {
    case TYPE.EDO:
      return createFilerRequest;
    case TYPE.REPORTS:
      return createRequest;
  }
}

function _addSelectedServiceToRequest(obj: IRequest, checkedSettingIds: []): IRequest {
  checkedSettingIds.forEach((service: string) => {
    obj[service] = true;
  });

  return obj;
}

function _getRequestModelByData(data: IState) {
  const firstName = data.firstName || data.contactFirstName || data.certFirstName;
  const lastName = data.lastName || data.contactLastName || data.certLastName;
  const middleName = data.middleName || data.contactMiddleName || data.certMiddleName;

  const contactPersonFullName = _getPersonFullName(lastName, firstName, middleName);

  const obj: IRequest = {
    CertificateBodyInBase64: data.certificateBodyInBase64,
    SelectedTariff: _getSelectedTariff(data.tariff, data.regionCode),
    Agent: data.agent || null,
    INN: data.inn,
    KPP: data.kpp || null,
    OGRN: data.ogrn,
    LegalAddressFiasId: data.legalAddress && data.legalAddress.fiasAddressId,
    CompanyShortName: data.organizationName,
    ContactPersonEmail: data.email || data.contactEmail,
    ContactPersonFullName: contactPersonFullName,
    ContactPersonPhone: data.contactPhone || '1111111111',
    LastName: lastName,
    FirstName: firstName,
    MiddleName: middleName,
    Post: data.post,
    SNILS: data.snils,
    Utm: data.utm,
    Comment: data.comment,
  };

  _addSelectedServiceToRequest(obj, data.checkedSettingIds);

  return obj;
}

export function getRequestModel(data: any) {
  return _getRequestModelByData(data);
}

export async function sendRequest(data: any, type: number = TYPE.REPORTS) {
  const requestData = _getRequestModelByData(data);

  const methodRequest = _getMethodRequestByType(type);

  try {
    const result = await methodRequest(requestData);
    const { Error: error, RedirectUrl: redirectUrl, Success: success, Message: message, RequestId: requestId } = result;

    if (error || !success || message) {
      return { error: (error && error.Message) || message || 'Произошла непредвиденная ошибка', requestId };
    }

    return { redirectUrl };
  } catch (error) {
    window.console.error(error);

    return { error: error.message || 'Произошла непредвиденная ошибка' };
  }
}
