import styled from 'styled-components';

import { IProps } from './Interfaces';

export const ButtonWrapper: any = styled.button<IProps>`
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  width: ${props => (props.width ? props.width : 'auto')};
  align-self: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 0.28571429rem;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  text-align: center;
  padding: 0.77571429em 1.5em;
  font-weight: 600;
  background-color: ${props =>
    props.primary === true
      ? props.color
        ? `${props.color}`
        : `${props.theme.primary}`
      : `${props.theme.transparent}`};
  color: ${props => (props.primary === true ? '#FFF' : props.color ? `${props.color}` : `${props.theme.primary}`)};
  border: ${props => (props.color ? `1px solid ${props.color}` : `1px solid ${props.theme.primary}`)};
  &:hover {
    ${props =>
      props.primary === true && !props.disabled
        ? `background-color: ${props.color ? props.color : '#5294de'}`
        : `color: ${props.color ? props.color : '#5294de'}`}
    border-color: ${props => (props.color ? `${props.color}` : '#5294de')};
  }
  &:disabled,
  &.disabled {
    background-color: #f9f9f9;
    color: ${props => props.theme.disabled};
    border: 1px solid ${props => props.theme.disabled};
    &:hover {
      color: ${props => props.theme.disabled};
      border: 1px solid ${props => props.theme.disabled};
      cursor: default;
    }
  }
`;

export const ButtonLink: any = styled.a<IProps>`
  width: ${props => (props.width ? props.width : 'auto')};
  box-sizing: border-box;
  align-self: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  border-radius: 0.28571429rem;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
  text-align: center;
  padding: 0.77571429em 1.5em;
  font-weight: 600;
  background-color: ${props =>
    props.primary === true
      ? props.color
        ? `${props.color}`
        : `${props.theme.primary}`
      : `${props.theme.transparent}`};
  color: ${props => (props.primary === true ? '#FFF' : props.color ? `${props.color}` : `${props.theme.primary}`)};
  border: ${props => (props.color ? `1px solid ${props.color}` : `1px solid ${props.theme.primary}`)};
  &.disabled {
    background-color: #f9f9f9;
    color: ${props => props.theme.disabled};
    border: 1px solid ${props => props.theme.disabled};
    &:hover {
      color: ${props => props.theme.disabled};
      border: 1px solid ${props => props.theme.disabled};
      cursor: default;
    }
  }
  &:hover {
    ${props =>
      props.primary === true && !props.disabled
        ? `background-color: ${props.color ? props.color : '#5294de'}`
        : `color: ${props.color ? props.color : '#5294de'}`}
    border-color: ${props => (props.color ? `${props.color}` : '#5294de')};
    text-decoration: none;
  }
`;
