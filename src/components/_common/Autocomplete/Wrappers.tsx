import styled, { keyframes } from 'styled-components';

interface IInput {
  border: string;
  autocomplete: string;
  disabled?: boolean;
  error?: string;
}

export const ScrollContainer: any = styled.div`
  background: #fff;
  border-radius: 0.28571429rem;
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12), 0 2px 10px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid #d4d4d5;
  animation-iteration-count: 1;
  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-fill-mode: both;
  z-index: 999;
  position: absolute;
  top: 100%;
  left: 0;
  transform-origin: center top;
  max-height: 230px;
  min-height: 25px;
  overflow-y: auto;
  width: 100%;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.25);
    transition: color 0.2s ease;
  }
`;

export const ResultItemWrapper: any = styled.div`
  cursor: pointer;
  overflow: hidden;
  font-size: 1em;
  padding: 0.55714286em 1.14285714em;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  line-height: 1.33;

  :first-child {
    border-radius: 0.28571429rem 0.28571429rem 0 0;
  }
  :last-child {
    border-radius: 0 0 0.28571429rem 0.28571429rem;
  }
  :hover {
    background: #f9fafb;
  }
`;

export const InputWrapper: any = styled.input<IInput>`
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  margin: 0;
  outline: 0;
  -webkit-appearance: none;
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
  -webkit-box-shadow: 0 0 0 0 transparent inset;
  box-shadow: 0 0 0 0 transparent inset;
  -webkit-transition: color 0.1s ease, border-color 0.1s ease;
  /* width: 100%; */
  vertical-align: top;
  padding-right: 3em;
  transition: box-shadow 0.1s ease, border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  ::-ms-reveal,
  ::-ms-clear {
    display: none;
  }

  &:focus {
    color: ${props =>
      props.error && Object.keys(props.error).length > 0 ? `${props.theme.error}` : 'rgba(0, 0, 0, 0.87)'};
    border-color: ${props => (props.error && Object.keys(props.error).length > 0 ? '#e0b4b4' : '#85b7d9')};
    border-radius: 0.28571429rem;
    background: ${props => (props.error && Object.keys(props.error).length > 0 ? '#fff6f6' : '#fff')};
    -webkit-box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
    box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.35) inset;
  }

  :not(:focus)::-webkit-input-placeholder {
    color: rgba(191, 191, 191, 0.87);
  }
`;

export const ErrorSpan: any = styled.span`
  text-align: left;
  color: ${props => props.theme.error};
  font-size: 11px;
  display: block;
  width: 100%;
  white-space: nowrap;
`;

export const InputContainer: any = styled.span`
  width: ${props => (props.width ? props.width : '215px')};
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ResultsWrapper: any = styled.div`
  display: block;
  white-space: normal;
  text-align: left;
  text-transform: none;
  background: #fff;
  min-width: ${props => (props.width ? props.width : '215px')};
  width: ${props => (props.width ? props.width : '100%')};

  .esp__auto-complete__error {
    margin: 0 10px;
    line-height: 20px;
    vertical-align: middle;
    box-sizing: border-box;

    .text-grey {
      color: #999;
    }
  }
`;

const rotate: any = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SearchWrapper: any = styled.span`
  position: absolute;
  right: 14px;
  top: calc(50% - 9px);
`;

export const LoaderWrapper: any = styled.span`
  position: absolute;
  right: 14px;
  height: 20px;
  top: calc(100% - 30px);
  animation: ${rotate} 1.2s infinite linear;
  animation-delay: 0s;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
`;
