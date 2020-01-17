'use strict';

export interface IProps {
    type: number;
    isAuth: boolean;
    regionCode: number;
    productType: number;
    inProccess: boolean;
    changeStep: (step: number, data?: object) => void;
}
  
export interface IState {
    isSpecialMode: boolean;
    cards: ITarif[];
    isWait: boolean;
}

export interface ITarif {
    name: string;
    sale: number;
    basePrice: number;
    rangePrice: any;
    price: number;
    paymentPeriod: string;
    paymentLabel: string;
    url: string;
    priceTitle: string;
    isRecommended: boolean;
    isSpecialMode: boolean;
    exchangeDirections: IExchangeDirection[];
    settings: ISettings[];
    gko: ICount;
    shortDescription: string;
    isPromo: boolean;
    numberOfDocuments?: string;
}

interface IExchangeDirection {
    name: string;
    displayName: string;
    atExtraCost: boolean;
    sortOrder: number;
    min: number;
    max: number;
}

export interface ISettings {
    settingName: string;
    settingDisplayName: string;
    description: string;
    atExtraCost: boolean;
    sortOrder: number;
    min: number;
    max: number;
}

interface ICount {
    min: number;
    max: number;
}