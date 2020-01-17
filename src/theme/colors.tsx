import { TYPE } from './../constants';

export interface IColors {
  success: string;
  successLight: string;
  neutral: string;
  neutralLight: string;
  primary: string;
  primaryLight: string;
  muted: string;
  white: string;
  error: string;
  disabled: string;
  inputDisabled: string;
  transparent: string;
  black: string;
  grey: string;
  background: string;
  text: string;
  green: string;
  link: string;
}

const defaultColors = {
  success: '#F7941D',
  successLight: '#FDEAD2',
  neutral: '#F5F8FA',
  neutralLight: '#E6EAEC',
  primary: '#1685CE',
  primaryLight: '#47b6ff',
  muted: '#7B868C',
  white: '#FFF',
  error: '#9f3a38',
  disabled: '#d6d6d6',
  inputDisabled: '#ececec',
  transparent: 'rgba(0, 0, 0, 0)',
  black: '#333',
  grey: '#999',
  background: '#F5F8FA',
  text: '#6a7f98',
  green: '#4caf50',
  link: '#1565c0',
};

const edoColors = {
  success: '#B862C8',
};

const reportsColors = {
  success: '#F7941D',
  successLight: '#FDEAD2',
};

export const getColorsByType = (type: number) => {
  switch (type) {
    case TYPE.EDO:
      return { ...defaultColors, ...edoColors };
    case TYPE.REPORTS:
      return { ...defaultColors, ...reportsColors };
    default:
      return { ...defaultColors };
  }
};

export default defaultColors;
