'use strict';

export interface IState {
  isOpen: boolean;
}

export interface IProps {
  caption: ICaption;
  onClick?: () => void;
  onLogIn?: (isLogin?: any, accountData?: any) => void;
}

interface ICaption {
  inn?: string;
  kpp?: string;
  name?: string;
  shortName?: string;
  Inn?: string;
  Kpp?: string;
  ShortName?: string;
}
