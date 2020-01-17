import styled, { keyframes } from 'styled-components';

import waitingIcon from './../../../../public/images/spinner-icon.svg';

export const TariffListWrapper: any = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  background: ${props => props.theme.transparent};

  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const TabBorder: any = styled.div`
  @media (max-width: 576px) {
    margin: -2px 0 20px 0;
  }
  @media (max-width: 768px) {
    margin: -2px 0 20px 0;
  }
  @media (max-width: 992px) {
    margin: -2px 0 20px 0;
  }
  height: 2px;
  background: #e6eaec;
  margin: -2px 0 60px 0;
`;

export const SpinnerContentWrapper: any = styled.div`
  display: flex;
  justify-content: center;
  padding: 250px;
`;

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
`;
