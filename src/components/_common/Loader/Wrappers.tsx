import styled, { keyframes } from 'styled-components';
import waitingIcon from '../../../../public/images/spinner-icon.svg';

const AnimationSpinner = keyframes`
  0%  {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}   
`;

export const SpinnerWrapper: any = styled.span`
  background: url(${waitingIcon}) 100% 100% no-repeat;
  user-select: none;
  width: 90px;
  height: 90px;
  display: inline-block;
  animation: ${AnimationSpinner} 2s infinite linear;
  margin: 0 auto;
  align-self: center;
  justify-self: center;
`;
