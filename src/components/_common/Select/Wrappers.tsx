import styled from 'styled-components';

interface ISelect {
  error?: any;
}

export const SelectWrapper: any = styled.select<ISelect>`
  position: relative;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  margin: 0;
  outline: 0;
  -webkit-appearance: none;
  tap-highlight-color: rgba(255, 255, 255, 0);
  line-height: 1.21428571em;
  padding: 0.53857143em 1em;
  font-size: 1em;
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
  -webkit-box-shadow: 0 0 0 0 transparent inset;
  box-shadow: 0 0 0 0 transparent inset;
  -webkit-transition: color 0.1s ease, border-color 0.1s ease;
  transition: color 0.1s ease, border-color 0.1s ease;
  padding-right: 1.5em;
  vertical-align: top;

  ::-ms-reveal,
  ::-ms-clear,
  ::-ms-expand {
    display: none;
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

export const SelectContainer: any = styled.span`
  position: relative;
  ::after {
    content: '';
    top: 18px;
    position: absolute;
    right: 10px;
    border: 5px solid transparent;
    border-top: 5px solid #000;
  }
`;
