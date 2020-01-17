import styled from 'styled-components';

import checkIcon from '../../../../../public/images/check-tariff.png';

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

const Row: any = styled.div``;

export const Button: any = styled.div`
  margin: 15px 74px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: ${props => props.theme.success};
  border: 2px solid ${props => props.theme.success};
  padding: 10px 0;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
`;

export const RangeWrapper: any = styled.div`
  padding: 0 40px;
  border-top: 1px solid #e6eaec;
`;

export const HeaderWrapper: any = styled(Row)`
  padding: 20px 30px;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

export const Content: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Price: any = styled.span<IPriceProps>`
  font-weight: bold;
  font-size: ${props => (props.fontSize ? props.fontSize : '26px')};

  ::after {
    font-weight: normal;
    content: ' ₽';
  }
`;

export const PriceWrapper: any = styled(Row)`
  padding: 0 15px;
  text-align: center;
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

  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0 15px 30px 15px;
  line-height: normal;

  ${props =>
    props.isRecommended === true
      ? `border: 1px solid ${props.theme.successLight}; margin-top: -30px;`
      : `border: 1px solid ${props.theme.neutralLight}; background: ${props.alone ? '#ffffff' : '#f5f8fa'};`};

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

  :hover {
    ${props =>
      props.alone === false
        ? `
      box-shadow: 0px 5px 15px rgba(0, 52, 86, 0.15);
          `
        : null}

    ${Button} {
      background: ${props => props.theme.success};
      color: #fff;
      box-shadow: 0px 5px 15px rgba(0, 52, 86, 0.3);
    }
  }

  ${PriceWrapper} {
    ${props => (props.alone === true ? `border-top: 1px solid ${props.theme.neutralLight};` : null)}
  }

  ${props =>
    props.alone === true
      ? `margin: 0;
        .esp__tariffs__tariff-card__price-info {
          line-height: 60px;
        }`
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
          min-width: 350px;
          max-width: calc(25% - 30px);
          order: 1;
        }`}
`;

export const ReportsToDepartmentsWrapper: any = styled(Row)`
  padding: 15px 0;
  text-align: left;
  min-height: 325px;
`;

export const ReportsToDepartmentsTitle: any = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin: 0 25px 5px 25px;
  color: black;
`;

export const RangeTitle: any = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin: 20px 0 20px -17px;
  color: black;
  white-space: nowrap;
`;

export const LabelPrice: any = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: #232731;
`;

export const PriceTitle: any = styled.div`
  font-size: 14px;
  color: ${props => props.theme.muted};
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

export const ExchangeDirection: any = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: #4f525a;
  padding: 5px 10px;
  border-radius: 30px;
  margin: 0 15px 5px;

  ::before {
    content: '';
    background: url(${checkIcon}) no-repeat;
    display: inline-block;
    width: 20px;
    height: 15px;
  }
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

export const OptionsDesc: any = styled.div`
  color: ${props => props.theme.muted};
  margin: 0 0 15px 0;
  line-height: 15px;
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
