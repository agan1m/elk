import styled from 'styled-components';
import Button from '../../../components/_common/Button';
import { IStepItem } from './Interfaces';
import colors from '../../../theme/colors';

import orgIcon from '../../../../public/images/buildings.svg';
import certIcon from '../../../../public/images/contract.svg';
import orderIcon from '../../../../public/images/tasks.svg';

export const PageWrapper: any = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const InfoStatusWrapper: any = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 0 47px;
`;

export const StepsWrapper: any = styled.div`
  width: 58%;
  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const TabsWrapper: any = styled.div`
  width: 40%;
  @media (max-width: 1200px) {
    max-width: 100%;
    width: auto;
  }
`;

export const StepsList: any = styled.ol`
  counter-reset: section;
  list-style-type: none;
  padding-left: 0;
  margin: 16px 0;
`;

export const ButtonWrapper: any = styled(Button)`
  padding: 0.57571429em 1.3em;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

export const StepsListItem: any = styled.li<IStepItem>`
  position: relative;
  min-height: 80px;
  vertical-align: top;
  @media (max-width: 559px) {
    display: flex;
  }
  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${props =>
      props.step > props.currentStep
        ? `${colors.green}`
        : props.step === props.currentStep
        ? `${colors.success}`
        : props.step === 0
        ? `${colors.error}`
        : `${colors.disabled}`};
  }
  &::before {
    counter-increment: section;
    content: counter(section);
    position: relative;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-size: 16px;
    color: ${props =>
      props.step > props.currentStep
        ? `${colors.green}`
        : props.step === props.currentStep
        ? `${colors.success}`
        : props.step === 0
        ? `${colors.error}`
        : `${colors.disabled}`};
    text-align: center;
    box-shadow: ${props =>
      props.step > props.currentStep
        ? `inset 0 0 0 2px ${colors.green}`
        : props.step === props.currentStep
        ? `inset 0 0 0 2px ${colors.success}`
        : props.step === 0
        ? `inset 0 0 0 2px ${colors.error}`
        : `inset 0 0 0 2px ${colors.disabled}`};
    margin: 0;
    margin-right: 15px;
    display: inline-block;
    font-weight: 600;
    box-sizing: border-box;
    padding-top: 8px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 38px;
    height: calc(100% - 40px);
    width: 2px;
    left: 17px;
    z-index: 5;
    box-sizing: border-box;
    background-color: ${props =>
      props.step > props.currentStep
        ? `${colors.green}`
        : props.step === props.currentStep
        ? `${colors.success}`
        : props.step === 0
        ? `${colors.error}`
        : `${colors.disabled}`};
    @media (max-width: 600px) {
      display: none;
    }
  }
  &:last-child {
    &::after {
      display: none;
    }
  }
`;

export const StepsListItemContent: any = styled.div`
  display: inline-block;
  padding-top: 6px;
  width: 90%;
  padding-bottom: 2rem;
  vertical-align: top;
  span {
    color: ${colors.text};
  }
  @media (max-width: 600px) {
    width: calc(100% - 50px);
  }
  p {
    font-size: 14px;
    margin: 1em 0;
    line-height: 1.4;
    @media (max-width: 600px) {
      font-size: 13px;
    }
  }
`;

export const PaymentList: any = styled.ul`
  padding: 0;
  list-style: none;
  margin: 15px 0;
`;

export const PaymentListItem: any = styled.li`
  padding-left: 15px;
  margin: 0.5em 0;
  position: relative;
  @media (max-width: 600px) {
    font-size: 13px;
  }
  ::before {
    content: '';
    position: absolute;
    height: 3px;
    width: 10px;
    background-color: ${colors.link};
    top: 50%;
    left: 0;
  }
`;

export const CompositionOrderContainer: any = styled.div`
  max-height: 350px;
  overflow-y: auto;
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

export const CertsContainer: any = styled.div`
  max-height: 400px;
  overflow-y: auto;
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

export const PaymentButtons: any = styled.div`
  & > :first-child {
    margin-right: 10px;
  }
`;

export const RequestLink: any = styled.span`
  color: ${colors.link};
  fill: ${colors.link};
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
  width: max-content;
  text-decoration: none;
  max-width: 100%;
  @media (max-width: 600px) {
    font-size: 13px;
    display: block;
  }
`;

export const DocsContainer: any = styled.div`
  padding-left: 10px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

export const AddressLine: any = styled.div`
  margin-bottom: 0;
  position: relative;
  font-size: 14px;
`;

export const AddressTitle: any = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const AddressText: any = styled.p`
  line-height: 1.5rem;
  color: #90a4ae;
  margin: 0;
`;

export const CompositionOrder: any = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5em 0;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  padding: 5px;
`;

export const CompositionOrderName: any = styled.p`
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const CompositionOrderPrice: any = styled.p`
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`;

export const CertItemWrapper: any = styled.div`
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  margin-bottom: 10px;
`;

export const AddressField: any = styled.span`
  display: block;
`;

export const TabText: any = styled.span`
  display: inline-block;
  @media (max-width: 420px) {
    display: none;
  }
`;

export const TabOrgIcon: any = styled.span`
  background-image: url(${orgIcon});
  background-size: contain;
  padding: 14px;
  background-repeat: no-repeat;
  background-position: center;
  display: none;
  @media (max-width: 420px) {
    display: inline-block;
  }
`;

export const TabCertIcon: any = styled.span`
  background-image: url(${certIcon});
  background-size: contain;
  padding: 12px;
  background-repeat: no-repeat;
  background-position: center;
  display: none;
  @media (max-width: 420px) {
    display: inline-block;
  }
`;

export const TabOrderIcon: any = styled.span`
  background-image: url(${orderIcon});
  background-size: contain;
  padding: 12px;
  background-repeat: no-repeat;
  background-position: center;
  display: none;
  @media (max-width: 420px) {
    display: inline-block;
  }
`;

export const SpoilerWrapper: any = styled.div`
  margin-bottom: 15px;
`;
