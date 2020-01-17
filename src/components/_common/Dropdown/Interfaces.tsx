export interface IProps {
  options: Array<Object>;
  optionValue: string;
  optionText: string;
  optionCaption?: string;
  value?: any;
  disabled?: boolean;
  onChange?: Function;
  isOpened?: boolean;
  width?: string;
}

export interface IState {
  options: Array<Object>;
  optionValue: string;
  optionText: string;
  optionCaption?: string;
  value?: any;
  disabled?: boolean;
  onChange?: Function;
  isOpened?: boolean;
}

export interface IStyle {
  width?: string;
}
