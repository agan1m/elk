import styled from 'styled-components';

import saleIcon from './../../../../../public/images/sale.png';
import NecesseryArrowIcon from './../../../../../public/images/arrow.png';

interface ICardWrapperProps {
  isRecommended: boolean;
  alone: boolean;
}

interface IOptionsTitleProps {
  uppercase: boolean;
}

interface ITooltipProps {
  disabled: boolean;
  width?: string;
}

interface IPriceProps {
  fontSize?: string;
}

interface INecesseryServiceProps {
  isServiceOpen: boolean;
}

const Row: any = styled.div`
  border-bottom: 1px solid ${props => props.theme.neutralLight};
  :last-of-type {
    border-bottom: none;
  }
`;

export const Button: any = styled.div`
  margin: 15px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: ${props => props.theme.success};
  border: 2px solid ${props => props.theme.success};
  padding: 15px 0;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
`;

export const HeaderWrapper: any = styled(Row)`
  padding: 20px 30px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.neutralLight};
  position: relative;
  font-weight: bold;
  font-size: 23px;
  white-space: nowrap;
  color: black;
`;

export const OptionsDesc: any = styled.div`
  color: ${props => props.theme.muted};
  margin: 0 0 15px 0;
  line-height: 15px;
`;

export const NecesseryService: any = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #1685ce;
  border-bottom: 1px dashed #1685ce;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;

  & + div ${OptionsDesc} {
    margin: 0 0 5px 0;
    color: #212529;
  }

  & + div {
    margin: 15px 0 0 0;
  }
`;

export const TooltipContent: any = styled.div`
  display: none;
  background: #fff;
  width: 247px;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #000;
  text-transform: none;
  padding: 20px;
  position: absolute;
  left: 0;
  top: 25px;
  z-index: 9999999;
  box-sizing: border-box;
  box-shadow: 0px 5px 15px rgba(0, 52, 86, 0.15);
  text-align: left;

  ::after {
    position: absolute;
    left: 24px;
    top: -11px;
    margin: -5px auto 0;
    display: block;
    border: 8px solid #fff;
    border-right-color: transparent;
    border-top-color: transparent;
    border-left-color: transparent;
    content: '';
    width: 0;
    z-index: 1;
  }
`;

export const TooltipWrapper: any = styled.span<ITooltipProps>`
  :hover {
    ${TooltipContent} {
      display: ${props => (props.disabled ? 'none' : 'block')};
    }
  }

  ${props =>
    props.width
      ? `
    ${TooltipContent} {
      width: ${props.width};
    }
  `
      : null}

  position: relative;
  cursor: pointer;
`;

export const Content: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  :hover {
    ${Button} {
      background: ${props => props.theme.success};
      color: #fff;
      box-shadow: 0px 5px 15px rgba(0, 52, 86, 0.3);
    }
  }
`;

export const CardWrapper: any = styled.div<ICardWrapperProps>`
  @media (max-width: 576px) {
    display: block;
    margin: 0;
  }
  @media (max-width: 768px) {
    display: block;
    margin: 0 0 20px 0;

    :nth-child(2) {
      margin: 0 60px 20px 0;
    }

    :nth-child(3) {
      margin: 0 60px 20px 0;
    }
  }
  @media (max-width: 992px) {
    display: block;
    margin: 0 0 20px 0;

    :nth-child(2) {
      margin: 0 60px 20px 0;
    }

    :nth-child(3) {
      margin: 0 60px 20px 0;
    }
  }

  background: ${props => props.theme.white};
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0 15px 30px 15px;
  line-height: normal;

  ${props =>
    props.alone === false
      ? `
    :hover {
      box-shadow: 0px 5px 15px rgba(0, 52, 86, 0.15);
    }
  `
      : null};

  ${props =>
    props.isRecommended === true
      ? `border: 1px solid ${props.theme.successLight}; min-height: ${
          props.alone === false ? '790px' : '0'
        }; margin-top: -30px;`
      : `border: 1px solid ${props.theme.neutralLight}; min-height: ${props.alone === false ? '760px' : '300px'};`};

  ${HeaderWrapper} {
    ${props =>
      props.isRecommended === true
        ? `background: ${props.theme.successLight}; padding-top: 60px; ::before {
          content: "Рекомендуем";
          font-size: 15px;
          color: #F7941D;
          font-weight: normal;
          display: block;
          margin: -48px 0 18px 0;
          box-sizing: border-box;
        }`
        : null};
  }
  ${props =>
    props.alone === true
      ? 'margin: 0;'
      : `@media (min-width: 0px) {
          flex: 0 0 100%;
          width: calc(100% - 30px);
          order: ${props.isRecommended === true ? 0 : 1};
        }

        @media (min-width: 576px) {
          flex: 0 0 100%;
          max-width: calc(100% - 30px);
          order: ${props.isRecommended === true ? 0 : 1};
        }

        @media (min-width: 768px) {
          flex: 0 0 50%;
          max-width: calc(50% - 30px);
          order: ${props.isRecommended === true ? 0 : 1};
        }

        @media (min-width: 992px) {
          flex: 0 0 25%;
          max-width: calc(25% - 30px);
          order: 1;
        }`}
`;

export const Sale: any = styled.div`
  @media (max-width: 576px) {
    right: 0;
  }

  background: url(${saleIcon}) no-repeat;
  width: 40px;
  height: 40px;
  color: ${props => props.theme.white};
  line-height: 40px;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: -20px;
  right: -20px;
`;

export const ReportsToDepartmentsWrapper: any = styled(Row)`
  padding: 15px;
  text-align: left;
`;

export const ReportsToDepartmentsTitle: any = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin: 0 0 15px 0;
  color: black;
`;

export const PriceWrapper: any = styled(Row)`
  padding: 15px;
  text-align: center;
`;

export const LabelPrice: any = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: #232731;
`;

export const Price: any = styled.span<IPriceProps>`
  font-weight: bold;
  font-size: ${props => (props.fontSize ? props.fontSize : '26px')};
  color: ${props => props.theme.primary};

  ::after {
    font-weight: normal;
    content: ' ₽';
  }
`;

export const PriceTitle: any = styled.div`
  font-size: 11px;
  color: ${props => props.theme.muted};
  text-transform: uppercase;
  font-weight: normal;
  margin: 5px 0 0 0;

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
  }
`;

export const OldPrice: any = styled(Price)`
  color: ${props => props.theme.muted};
  font-size: 18px;
  text-decoration: line-through;
  margin-right: 10px;
`;

export const Period: any = styled.span`
  color: ${props => props.theme.primary};
  font-weight: 400;
  font-size: 15px;
  ::before {
    content: '/';
  }
`;

export const ExchangeDirection: any = styled.span`
  background: #d0e7f5;
  border: 1px solid #bcd6e6;
  display: inline-block;
  font-size: 12px;
  line-height: 18px;
  color: #4f525a;
  padding: 5px 10px;
  border-radius: 30px;
  margin: 0 5px 5px 0;
`;

export const ExchangeDirectionMoney: any = styled(ExchangeDirection)`
  background: ${props => props.theme.white};
`;

export const AddRouble: any = styled.span`
  color: ${props => props.theme.primary};
  font-size: 12px;

  ::after {
    content: ' +₽';
  }
`;

export const OptionsWrapper: any = styled(Row)`
  padding: 15px;
  text-align: left;
  font-size: 13px;
`;

export const OptionWrapper: any = styled.div`
  position: relative;
`;

export const FullInfoWrapper: any = styled(Row)`
  padding: 15px;
  text-align: left;
  font-size: 14px;
`;

export const OptionsTitle: any = styled.div<IOptionsTitleProps>`
  font-weight: bold;
  margin: 0 0 5px 0;

  ${props =>
    props.uppercase === true
      ? `
    text-transform: uppercase;
  `
      : null}
`;

export const NecesseryIcon: any = styled.div<INecesseryServiceProps>`
  position: relative;
  display: inline-block;
  height: 12px;

  ::after {
    content: '';
    background: url(${NecesseryArrowIcon}) no-repeat;
    display: block;
    width: 12px;
    height: 6px;
    position: absolute;
    right: -20px;
    top: 5.5px;
    transition: 0.3s;
    ${props =>
      props.isServiceOpen
        ? `
        transform: rotate(180deg);
        `
        : null}
  }
`;

export const NecesseryServiceList: any = styled.div<INecesseryServiceProps>`
  opacity: 0;
  height: 0;

  div {
    display: none;
  }

  ${props =>
    props.isServiceOpen
      ? `
          opacity: 1;
          height: auto;
          transition: all 1s;

          div {
            display: block;
          }
        `
      : null}
`;
