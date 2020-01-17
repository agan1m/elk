import styled from 'styled-components';

import { CertModalWrapper } from './../../../components/CertModal/Wrappers';

interface IControls {
  hasAccount?: boolean;
}

export const LinkWrapper: any = styled.span`
  font-size: 14px;
  a {
    text-decoration: underline;
  }
`;

export const TariffsOrganizationWrapper: any = styled.div`
  min-height: 905px;
`;

export const EmailTextWrapper: any = styled.div`
  font-size: 14px;
  height: 14px;
  margin: -10px 0 10px 0;

  span {
    color: #f57c00;
    font-size: 12px;
  }
`;

export const EmailWrapper: any = styled.div`
  text-align: justify;
  text-align-last: justify;
`;

export const TooltipWrapper: any = styled.div`
  position: absolute;
  top: 42px;
  right: -25px;
  text-align: left;
`;

export const StepWrapper: any = styled.div`
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  width: 100%;
  font-size: 14px;
  background: #eff4f6;
  text-align: left;
  height: 135px;
  line-height: 235px;
  box-sizing: content-box;
  a {
    display: block;
    margin: 0 auto;
    padding: 0 10px;
    width: 1110px;

    b {
      font-size: 18px;
      vertical-align: text-bottom;
      line-height: 18px;
    }
  }
`;

export const FormWrapper: any = styled.div`
  margin: 25px auto 0;
  max-width: 500px;
`;

export const ControlsWrapper: any = styled.div<IControls>`
  ${props =>
    props.hasAccount
      ? `
        text-align: justify;
        text-align-last: justify;

        a, button {
          display: inline-block;
          font-size: 14px;
        }
      `
      : `
        text-align: rigth;
        text-align-last: rigth;
      `}
`;

export const FieldLabel: any = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  padding: 0 0 14px;
  font-weight: 500;
  text-align: left;
`;

export const EmailLine: any = styled.div`
  width: 100%;
  margin: 42px 0;
  display: flex;
  flex-wrap: wrap;
  text-align-last: left;
`;

export const InputWrapper: any = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 5px 0;
`;

export const FieldsWrapper: any = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;

  & > div {
    width: 100%;
    text-align: right;
    position: relative;

    span + ${CertModalWrapper} {
      left: 0;
      top: 90px;
      width: 100%;

      :after {
        left: 13px;
        top: -9px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 0;
        border-right: 0;
      }
    }
  }
`;

export const SendAgain: any = styled.p`
  text-decoration: ${props => (props.disabled ? 'none' : 'underline')};
  color: ${props => (props.disabled ? props.theme.muted : props.theme.primary)};
  cursor: pointer;
  padding: 0 0 10px 0;
  margin: 0;
  font-size: 14px;
  line-height: 14px;
  margin-left: 5px;
`;

export const ButtonPanelWrap: any = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1110px;
  width: 100%;
  margin: 0 auto;
`;

export const ButtonPanelText: any = styled.div`
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  color: #3c5a7e;
  padding: 0 0 0 25px;
  font-size: 14px;
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
