'use strict';

export interface IProps {
  name?: string;
  value?: string;
  onChange?: (value: any, _error: boolean, attr: any) => void;
  onKeyPress?: (value: any) => void;
  required?: boolean;
  disabled?: boolean;
  validate?: boolean;
  withEye?: boolean;
  validKey?: string;
  placeholder?: string;
  type?: string;
  width?: any;
  serviceValidate?: (value: any) => void;
  optionCaption?: any;
  maxLength?: any;
  mask?: any;
  unmask?: any;
  className?: string;
  autocomplete?: string;
  validateAfterMount?: boolean;
}

export interface IState {
  value: string;
  maskValue: string;
  tempValue: string;
  errorMsg: any;
  error?: any;
  hasError: boolean;
  disabled: boolean;
  inProccess: boolean;
  passwordHide: boolean;
}
