import { h } from 'preact';
import styled from 'styled-components';
import { IMaskMixin } from 'react-imask';

interface IInput {
  error: string;
  disabled?: boolean;
}

export const InputWrapper: any = IMaskMixin(({ inputRef, ...props }) => <InputStyle {...props} innerRef={inputRef} />);

export const InputStyle: any = styled.input<IInput>`
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  margin: 0;
  outline: 0;
  tap-highlight-color: rgba(255, 255, 255, 0);
  line-height: 1.5em;
  padding: 0.51957143em 1em;
  font-size: 0.9em;
  background: ${props =>
    props.disabled
      ? `${props.theme.inputDisabled}`
      : props.error && Object.keys(props.error).length > 0
      ? '#fff6f6'
      : '#fff'};
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-color: ${props => (props.error && Object.keys(props.error).length > 0 ? '#e0b4b4' : 'rgba(34,36,38,0.15)')};
  color: ${props =>
    props.error && Object.keys(props.error).length > 0 ? `${props.theme.error}` : 'rgba(0, 0, 0, 0.87)'};
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 0 transparent inset;
  transition: color 0.1s ease, border-color 0.1s ease;
  vertical-align: top;
  width: 100%;

  ::-ms-reveal,
  ::-ms-clear {
    display: none;
  }

  :not(:focus)::-webkit-input-placeholder {
    color: rgba(191, 191, 191, 0.87);
  }

  &:focus {
    color: ${props =>
      props.error && Object.keys(props.error).length > 0 ? `${props.theme.error}` : 'rgba(0, 0, 0, 0.87)'};
    border-color: ${props => (props.error && Object.keys(props.error).length > 0 ? '#e0b4b4' : 'rgba(34,36,38,0.15)')};
    border-radius: 0.28571429rem;
    background: ${props => (props.error && Object.keys(props.error).length > 0 ? '#fff6f6' : '#fff')};
    -webkit-box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
    box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
  }
`;

export const ErrorSpan: any = styled.span`
  text-align: left;
  text-align-last: left;
  color: ${props => props.theme.error};
  font-size: 11px;
  display: block;
  width: 100%;
`;

export const InputContainer: any = styled.span`
  width: ${props => (props.width ? `${props.width}` : '215px')};
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const PasswordIconWrap: any = styled.span`
  position: absolute;
  top: 9px;
  right: 10px;
  cursor: pointer;
`;
