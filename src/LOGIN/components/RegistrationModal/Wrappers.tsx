import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './../../../components/_common/Button';
import { ILabel, ILoginLineProps, IModal } from './Interfaces';

interface ILink {
  size?: string;
}

const calculatePosition = (tab: number) => {
  switch (tab) {
    case 1:
      return '-226px';
    case 2:
      return '-535px';
    case 3:
      return '-296px';
    default:
      break;
  }
};

export const KppTitle: any = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const AuthWrapper: any = styled.span`
  float: right;
`;

export const ContainerModal: any = styled.span`
  position: relative;
  font-family: 'Open Sans', sans-serif;
`;

export const RegistrationModalWrapper: any = styled.div<IModal>`
  font-family: 'Open Sans', sans-serif;
  min-width: 315px;
  padding: 10px;
  min-height: 270px;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  left: ${props => calculatePosition(props.activeTab)};
  top: calc(100% + 24px);
  z-index: 2000;
  background-color: #fff;
  width: ${props => (props.width ? props.width : 'auto')};
  ::after {
    content: '';
    position: absolute;
    right: 25px;
    top: -7px;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 0;
    border-bottom: 0;
    transform: rotate(45deg);
    z-index: 2001;
  }
`;

export const LoginContainer: any = styled.div`
  padding: 20px 10px;
  width: 100%;
  text-align: left;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  box-sizing: border-box;
`;

export const LoginLine: any = styled.div<ILoginLineProps>`
  margin-bottom: ${props => (props.styleType === 'button' ? '10px' : '5px')};
  text-align: ${props => (props.styleType === 'button' ? 'center' : 'left')};
  padding: 0 0 4px;
  font-weight: 500;
`;

export const LoginForm: any = styled.div`
  margin: 0 auto;
`;

export const Loginlabel: any = styled.span<ILabel>`
  display: ${props => (props.display ? props.display : 'block')};
  color: ${props => props.color && props.theme[props.color]};
  font-size: ${props => (props.size ? props.size : '14px')};
  margin-bottom: 5px;
  padding: 0 0 4px;
  font-weight: 500;
  text-align: ${props => (props.styleType === 'button' ? 'center' : 'left')};
`;

export const ButtonWrapper = styled(Button)`
  margin-bottom: 12px;
  margin-left: 5px;
`;

export const RegistrationHeader: any = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 15px;
  border-bottom: 1px solid #e4ebf4;
  align-items: center;
`;

export const LinkWrap: any = styled(Link)<ILink>`
  color: ${props => props.theme.primary};
  text-decoration: underline;
  cursor: pointer;
  font-size: ${props => (props.size ? props.size : '15px')};
`;

export const LinkWrapDef: any = styled.a`
  color: ${props => props.theme.primary};
  text-decoration: underline;
  cursor: pointer;
  font-size: ${props => (props.size ? props.size : '15px')};
`;

export const TemplateOrgName: any = styled.span`
  display: block;
`;

export const TemplateInfo: any = styled.span`
  display: block;
  color: ${props => props.theme.grey};
  font-size: 14px;
  margin-top: 5px;
`;

export const ErrorText: any = styled.p`
  color: ${props => props.theme.error};
  padding: 0.5em;
  margin: 0;
  font-size: 14px;
`;

export const RegTitle: any = styled.span`
  font-weight: 500;
  font-size: 17px;
`;

export const SmallText: any = styled.span`
  font-size: 12px;
  color: ${props => props.theme.grey};
`;

export const LoginButton: any = styled(Button)`
  border-radius: 0;
  color: #000;
  border: 2px solid #badbf1;
  :hover {
    border-color: #badbf1;
    color: #000;
  }
`;

export const InputContainer: any = styled.div`
  display: flex;
  justify-content: space-between;
`;
