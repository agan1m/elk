import styled from 'styled-components';
import { ICertStyle } from './Interfaces';

export const ContainerModal: any = styled.span`
  @media (max-width: 576px) {
    position: static;
  }
  @media (max-width: 768px) {
    position: static;
  }
  @media (max-width: 992px) {
    position: static;
  }

  position: relative;
`;

export const CertModalWrapper: any = styled.div<ICertStyle>`
  @media (max-width: 576px) {
    width: 100%;
    top: 238px;
    left: 0;
    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    width: 100%;
    top: 238px;
    left: 0;
    box-sizing: border-box;
  }
  @media (max-width: 992px) {
    width: 100%;
    top: 238px;
    left: 0;
    box-sizing: border-box;
  }

  width: 700px;
  padding: 10px;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${props => (props.side === 'left' ? 'right: 110%' : 'left: 110%')};
  top: -60%;
  z-index: 2000;
  background-color: #fff;
  ::after {
    @media (max-width: 576px) {
      content: none;
    }
    @media (max-width: 768px) {
      content: none;
    }
    @media (max-width: 992px) {
      content: none;
    }

    content: '';
    position: absolute;
    ${props => (props.side === 'left' ? 'right: -9px' : 'left: -9px')};
    top: 10px;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    ${props => (props.side === 'left' ? 'border-left: 0' : 'border-right: 0')};
    ${props => (props.side === 'left' ? 'border-bottom: 0' : 'border-top: 0')};
    transform: rotate(45deg);
    z-index: 2001;
  }
`;

export const ScrollContainer: any = styled.div`
  height: 230px;
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

export const CloseIcon: any = styled.i<ICertStyle>`
  cursor: pointer;
  position: absolute;
  top: -1.5rem;
  ${props => (props.side === 'left' ? 'left: -1.5rem' : 'right: -2.5rem')};
  z-index: 1;
  opacity: 0.8;
  font-size: 1.25em;
  color: rgba(0, 0, 0, 0.25);
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.625rem 0 0;
  font-style: normal;
`;

export const CertTable: any = styled.table`
  @media (max-width: 576px) {
    font-size: 12px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 992px) {
    font-size: 12px;
  }

  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  border-spacing: 0;
  color: #6a7f98;
  border-collapse: separate;
  background-color: #fff;
  font-size: 14px;
`;

export const CertItem: any = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px 0px;
    color: rgba(0, 0, 0, 0.95);
    background-color: #fff;
    cursor: pointer;
  }
`;

export const CertLeftCell: any = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 340px;
`;
export const CertRightCell: any = styled.td`
  padding: 1rem;
  text-align: right;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const CertOrgName: any = styled.span`
  @media (max-width: 576px) {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    font-size: 13px;
  }
  @media (max-width: 992px) {
    font-size: 13px;
  }

  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  white-space: normal;
  line-height: 1.5rem;
  max-width: 99%;
  overflow: hidden;
  text-overflow: ellipsis;
  .FL63warning {
    font-size: 14px;
    font-weight: normal;
    color: #d56a77;
    margin-left: 0.75rem;
  }
`;

export const CertInn: any = styled.span`
  margin-bottom: 0.5rem;
  display: block;
`;

export const WrapperError: any = styled.div`
  padding: 30px;
  padding-left: 0px;
  text-align: center;
  p {
    height: 26px;
    font-size: 18px;
    line-height: 1.44;
    color: #3c5a7e;
    margin-top: 16px;
  }
  span {
    height: 19px;
    font-size: 14px;
    color: #6a7f98;
    margin-bottom: 30px;
  }
`;

export const ErrorText: any = styled.p`
  color: ${props => props.theme.error};
  padding: 0.5em 0;
  margin: 0;
`;
