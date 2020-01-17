import styled from 'styled-components';

import { InfoUserWrapper } from './../SecondData/Wrapper';

import successIcon from './../../../../public/images/check-icon.svg';

export const MainContainerWrapper: any = styled.div<any>`
  max-width: 1110px;
  margin: 0 auto;
  background: ${props => props.theme.transparent};
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  line-height: 1.4;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
  font-size: 19.25px;

  ${InfoUserWrapper} {
    padding: 84px;
    text-align: left;
    display: flex;
    line-height: 40px;
  }
`;

export const SuccessIconWrapper: any = styled.i<any>`
  background: url(${successIcon}) 100% 100% no-repeat;
  user-select: none;
  width: 35px;
  height: 35px;
  display: block;
  text-align: center;
  margin: 5px 20px 0 0;
`;
