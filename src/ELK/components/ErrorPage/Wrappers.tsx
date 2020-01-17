import styled from 'styled-components';
import errorIcon from '../../../../public/images/exclamation-triangle.svg';

export const ErrorPageWrapper: any = styled.div`
  width: 100%;
  text-align: center;
  align-self: center;
`;

export const ErrorText: any = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
`;

export const ErrorIcon: any = styled.span`
  background-image: url(${errorIcon});
  background-size: contain;
  background-repeat: no-repeat;
  padding: 30px;
`;
