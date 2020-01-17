'use strict';

export interface IProps {
  trigger?: string;
  disabled?: boolean;
  onSelect?: (cert: ICert) => void;
  certs?: ICert[];
}

export interface IState {
  open: boolean;
  certs: ICert[];
  error: any;
  side: string;
}

export interface IListProps {
  onSelect?: (cert: ICert, ind?: number) => void;
  certs?: ICert[];
  errorInd?: number;
  errorMsg?: string;
}

export interface ICert {
  o?: string;
  cn?: string;
  isFL63Cert: boolean;
  inn?: string;
  kpp?: string;
  thumb?: string;
  notAfter?: any;
}

export interface IErrorProps {
  error?: string;
}

export interface ICertStyle {
  side?: string;
}
