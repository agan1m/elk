import styled from 'styled-components';

import { ButtonWrapper } from './../../../components/_common/Button/Wrappers';
import { LinkWrapper } from './../../../components/_common/Link/Wrappers';

import { productType, productStatus } from './';

const getColorByType = (type: number) => {
  switch (type) {
    case productType.otchetnost:
      return '#FF9248';
    case productType.uc:
      return '#37BBEB';
    case productType.ofd:
      return '#F35757';
    case productType.filer:
      return '#B862C8';
    case productType.vetis:
      return '#FF9248';
    case productType.dosye:
      return '#3F51B5';
  }
};

export const PageWrapper: any = styled.div`
  @media (max-width: 576px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
  @media (max-width: 992px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }

  display: block;
  width: calc(100% + 6rem);
  height: calc(100% + 4rem);
  margin: -2rem -3rem;
  background: #f5f8fa;
`;

export const FooterWrapper: any = styled.div<any>`
  font-size: 14px;

  ${ButtonWrapper} {
    font-size: 12px;
    font-weight: 500;
    border: 1px solid;
    ${props =>
      props.status === productStatus.connecting
        ? `
      color: ${getColorByType(props.type)}; 
    `
        : ''}
  }
`;

export const ItemWrapper: any = styled.div<any>`
  @media (max-width: 576px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0 0 1rem 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0 0 1rem 0;
  }
  @media (max-width: 992px) {
    width: 100%;
    box-sizing: border-box;
    margin: 0 0 1rem 0;
  }

  border-radius: 3px;
  display: inline-block;
  margin: 0 1.5rem 1rem 0;
  box-shadow: 0 0 5px 0 rgba(136, 169, 191, 0.25);
  ${props =>
    props.status === productStatus.notConnected
      ? `
        border-left: 4px solid ${getColorByType(props.type)};
      `
      : props.status === productStatus.connecting
      ? `
        border-left: 4px solid ${getColorByType(props.type)};
        border-top: 4px solid ${getColorByType(props.type)};
      `
      : `
        border: 4px solid ${getColorByType(props.type)};
      `}

  ${FooterWrapper} {
    ${ButtonWrapper} {
      ${props =>
        props.status === productStatus.connecting
          ? `
          color: ${getColorByType(props.type)}; 
        `
          : ''}
    }
  }
`;

export const ItemContent: any = styled.div`
  @media (max-width: 576px) {
    width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 992px) {
    width: 100%;
    box-sizing: border-box;
  }

  padding: 30px 30px 20px;
  background: #fff;
  width: 420px;
`;

export const HeaderWrapper: any = styled.div`
  line-height: 30px;
`;

export const HeaderTitle: any = styled.span`
  font-size: 18px;
  color: #222;
  vertical-align: top;
  font-weight: 500;
  margin: 0 0 0 10px;
`;

export const HeaderIconWrapper: any = styled.span`
  width: 30px;
  height: 30px;
`;

export const BodyWrapper: any = styled.div`
  font-size: 14px;
  margin: 10px 0;
  height: 78px;

  ${LinkWrapper} {
    line-height: 25px;
  }
`;
