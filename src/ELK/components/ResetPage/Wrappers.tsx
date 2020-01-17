import styled from 'styled-components';
import colors from '../../../theme/colors';

import checkIcon from '../../../../public/images/check-icon.svg';

export const CheckboxWrapper: any = styled.div`
  font-size: 14px;
  margin: 10px 0;
`;

export const ResetWrapper: any = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

export const RestoreWrapper: any = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

export const LoginForm: any = styled.div`
  margin: 0 auto;
  width: 300px;
`;

export const LoginFormRestore: any = styled.div`
  margin: 0 auto;
`;

export const Title: any = styled.p`
  font-size: 22px;
  margin: 0 0 20px 0;
  padding: 0;
  text-align: center;
`;

export const ErrorText: any = styled.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: ${colors.error};
`;

export const SuccessWrapper: any = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 16px 0;
    background-image: url(${checkIcon});
    background-repeat: no-repeat;
    padding-left: 55px;
    background-position: left;
  }
`;

export const RestoreText: any = styled.p`
  margin: 16px 0;
  padding: 0;
  font-size: 14px;
`;

export const RestoreLine: any = styled.div`
  display: flex;
`;

export const Label: any = styled.span`
  padding-top: 9px;
  margin-right: 5px;
`;

export const ButtonLine: any = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
