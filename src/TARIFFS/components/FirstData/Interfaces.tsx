'use strict';

import { ITarif } from '../TariffList/Interfaces';

export interface IProps {
    type: number;
    step: number;
    comment: string;
    regionCode: number;
    tariff: ITarif;
    hasAccount?: boolean;
    onChange: (data?: object) => void;
    changeStep: (step: number, data?: object) => void;
}
  
export interface IState {
    error: string;
    cert: ICert;
    email: string;
    inn: string;
    kpp: string;
    fio: string;
    lastName: string;
    firstName: string;
    middleName: string;
    organizationName: string;
    code: string;
    confirmId: string;
    password: string;
    validateForm: IValid;
    inProccess: boolean;
    hasAccount: boolean;
    emailConfirmed?: boolean;
}

export interface ICert {
    inn: string;
    thumb?: string;
};

export interface IValid {
    email: boolean;
    password: boolean;
};