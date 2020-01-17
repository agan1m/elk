import styled, { keyframes } from 'styled-components';

import { ListWrapper } from './components/ListOffices/Wrapper';
import { MapWrapper } from './../../../components/YandexMap/Wrappers';

import { FieldLabel, InputWrapper as InpWrapper, FieldsWrapper } from './../FirstData/Wrappers';

import downloadIcon from './../../../../public/images/download-icon.svg';
import waitingIcon from './../../../../public/images/spinner-icon.svg';

interface IIcon {
  wait: boolean;
  disabled: boolean;
}

const AnimationSpinner: any = keyframes`
  0%  {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}   
`;

export const OfficeWrapper: any = styled.div`
  ${ListWrapper} {
    display: inline-block;
    width: 47%;
    @media (max-width: 576px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  ${MapWrapper} {
    @media (max-width: 576px) {
      display: none;
    }
    @media (max-width: 768px) {
      display: none;
    }
    display: inline-block;
    width: 53%;
    min-width: 53%;
  }
`;

export const MainContainerWrapper: any = styled.div`
  display: block;
  max-width: 1110px;
  margin: 0 auto 35px;
`;

export const ServiceWrapper: any = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const InfoUserWrapper: any = styled.div`
  @media (max-width: 576px) {
    max-width: 540px;
    display: block;
    margin: 0 auto;
    width: 100% !important;
  }
  @media (max-width: 768px) {
    max-width: 720px;
    display: block;
    margin: 0 auto;
    width: 100% !important;
  }
  @media (max-width: 992px) {
    max-width: 960px;
    display: block;
    margin: 0 auto;
    width: 100% !important;
  }

  margin-right: 3%;
  width: 72% !important;
  display: inline-block;
  background: white;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  box-shadow: 0 3px 10px 0 rgba(75, 129, 185, 0.08);
  border: 0;
`;

export const ServiceTitleWrapper: any = styled.p`
  margin-top: 60px;
  margin-bottom: 20px;
  font-size: 14px;
`;

export const LeftDataWrapper: any = styled.div`
  padding: 20px 30px;
  width: 100%;
  box-sizing: border-box;
`;

export const SubContainerWrapper: any = styled.div`
  display: flex;
  max-width: 1110px;
  margin: 0 auto 35px;

  ${LeftDataWrapper} {
    @media (max-width: 576px) {
      max-width: 540px;
      display: block;
      margin: 0 auto;
      width: 72% !important;
    }
    @media (max-width: 768px) {
      max-width: 720px;
      display: block;
      margin: 0 auto;
      width: 72% !important;
    }
    @media (max-width: 992px) {
      max-width: 960px;
      display: block;
      margin: 0 auto;
      width: 72% !important;
    }

    font-family: 'Open Sans', sans-serif;
    width: 73%;
    padding: 0;
  }

  ${ServiceTitleWrapper} {
    margin-top: 0;
  }
`;

export const TariffInfoWrapper: any = styled.div`
  @media (max-width: 576px) {
    max-width: 540px;
    display: block;
    margin: 0 auto;
    width: 95% !important;
    text-align: right;
  }
  @media (max-width: 768px) {
    max-width: 720px;
    display: block;
    margin: 0 auto;
    width: 95% !important;
    text-align: right;
  }
  @media (max-width: 992px) {
    max-width: 960px;
    display: block;
    margin: 0 auto;
    width: 95% !important;
    text-align: right;
  }

  .esp__tariffs__tariff-card {
    @media (max-width: 576px) {
      display: none;
    }
    @media (max-width: 768px) {
      display: none;
    }
    @media (max-width: 992px) {
      display: none;
    }

    .esp__tariffs__tariff-card__sale {
      @media (max-width: 1170px) {
        right: 0;
      }
    }
  }

  width: 25% !important;
  display: inline-block;
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  color: #3c5a7e;
  vertical-align: top;
`;

export const RightDataWrapper: any = styled.div`
  flex: 1;

  ${FieldsWrapper} {
    ${FieldLabel} {
      display: inline-block;
      line-height: 34px;
      padding: 0;
    }

    ${InpWrapper} {
      display: inline-block;
      width: calc(100% - 90px);
    }
  }
`;

export const RowWrapper: any = styled.div``;

export const TotalPriceWrapper: any = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15.75px;
  font-weight: 500;

  ::after {
    font-weight: normal;
    content: ' ₽';
  }
`;

export const InnKppWrapper: any = styled.span`
  color: #90a4ae;
  margin-bottom: 2rem;
  font-size: 12.25px;
`;

export const AgreementInfoWrapper: any = styled.div`
  font-size: 11.375px;
  max-width: 808px;
  margin: 0 auto;
  display: block;
  padding: 20px 0;
  font-family: 'Open Sans', sans-serif;
  color: #3c5a7e;
`;

export const Label: any = styled.h1`
  color: #3c5a7e;
  font-weight: 500;
  margin: 10px 0;
  font-size: 17.5px;
`;

export const FieldListWrapper: any = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  flex-direction: column;
  max-width: 500px;
  font-size: 14px;
`;

export const InputLabelWrapper: any = styled.span`
  display: inline-block;
  width: 100px;
  line-height: 32px;
  vertical-align: top;
  white-space: nowrap;
`;

export const InputWrapper: any = styled.span`
  display: inline-block;
`;

export const SettingsWrapper: any = styled.div`
  svg {
    vertical-align: middle;
    height: 40px;
  }
`;

export const TabsWrapper: any = styled.div`
  margin: 10px 0 10px 0;
  text-align: justify;
  text-align-last: justify;

  & > span,
  & > div {
    display: inline-block;
    vertical-align: top;
  }

  span {
    width: calc(100% - 185px);
    max-width: 350px;
  }

  select {
    width: 100%;
    vertical-align: sub;
    text-align: left;
    text-align-last: left;
  }
`;

export const FieldWrapper: any = styled.div`
  margin: 0 15px;
  display: block;
  padding-bottom: 20px;
  max-width: 470px;

  .auto-complete__controls span {
    top: calc(100% - 26px);
    svg {
      min-height: 18px;
    }
  }
`;

export const SpoilerWrapper: any = styled.div`
  margin: 2rem 10px;
`;

export const OfficeErrorWrapper: any = styled.div`
  text-align: left;
  color: ${props => props.theme.error};
  font-size: 11px;
  padding: 4px 0 0 15px;
`;

export const LinkRequestWrapper: any = styled.div`
  position: absolute;
  padding-top: 5px;
  font-size: 12.7px;
  display: flex;
  align-items: center;
  height: 20px;
`;

export const LinkDownloadWrapper: any = styled.span<IIcon>`
  background: url(${props => (props.wait ? waitingIcon : downloadIcon)}) 100% 100% no-repeat;
  user-select: none;
  width: 12px;
  height: 11px;
  display: inline-block;
  ${props => (props.wait ? `animation: ${AnimationSpinner} 2s infinite linear;` : null)}
  ${props =>
    props.disabled
      ? `
    filter: grayscale(100%);
    cursor: not-allowed;
  `
      : null}
`;

export const LinkLabelWrapper: any = styled.a`
  padding-right: 5px;
`;

export const ErrorTemplateWrapper: any = styled.div`
  height: 45px;
  text-align: center;
`;

export const ErrorContentWrapper: any = styled.div`
  border-color: #d9534f;
  background: #eba5a3;
  color: #761c19;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  display: block;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
  overflow: hidden;
`;
