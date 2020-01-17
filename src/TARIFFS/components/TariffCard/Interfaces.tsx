'use strict';

export interface IProps {
  name: string;
  sale: number;
  basePrice: number;
  price: number;
  rangePrice: any;
  paymentPeriod: string;
  paymentLabel?: string;
  priceTitle: string;
  exchangeDirections: any[];
  settings?: any[];
  isRecommended: boolean;
  necessaryServices?: string[];
  key?: any;
  alone?: boolean;
  onClickConnect?: (value?: any) => void;
  url?: string;
  type: number;
}

export interface IState {
  isServiceOpen: boolean;
  price?: any;
}

