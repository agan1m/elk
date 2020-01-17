import styled from 'styled-components';
import { TabTypes } from '.';

interface ITabWrapperProps {
  type: TabTypes;
  active: boolean;
  key: string;
  onClick: () => void;
  activeIndex?: number;
  isHide?: boolean;
}

interface IContainerWrapperProps {
  type?: TabTypes;
}

interface ITab {
  active?: boolean;
}

export const TabsWrapper: any = styled.ul`
  @media (max-width: 576px) {
    display: block;
  }
  @media (max-width: 768px) {
    display: block;
  }
  @media (max-width: 992px) {
    display: block;
  }

  padding: 0;
  display: inline-flex;
  border-radius: 2px;
  list-style: none;
  margin: 0;
`;

export const TabWrapper: any = styled.li<ITabWrapperProps>`
  ${props =>
    props.type === TabTypes.line
      ? `
      display: block;
      min-width: 200px;
      font-size: 15px;
      color: ${props => props.theme.primary};
      padding: 12px 10px;
      text-decoration: none;
      cursor: pointer;
      text-align: center;
    `
      : `
      @media (max-width: 576px) {
        display: block;
        margin: 0 0 10px 0;
      }
      @media (max-width: 768px) {
        display: block;
        margin: 0 0 10px 0;
      }
      @media (max-width: 992px) {
        display: block;
        margin: 0 0 10px 0;
      }
      display: inline-block;
      font-weight: bold;
      font-size: 16px;
      padding: 0 24px 15px 30px;
      text-transform: uppercase;
      color: ${props => props.theme.muted};
      cursor: pointer;
      position: relative;
    `}

  ${props =>
    props.type !== TabTypes.line && props.active === true
      ? `
    color: #1685CE;
    border-bottom: 2px solid #1685CE;
    z-index: 1;
    `
      : null}

  ${props =>
    props.type === TabTypes.line && props.active === true
      ? `border-right: 1px solid rgba(34,36,38,.15);
         background: rgba(0,0,0,.05);
         color: rgba(0,0,0,.95);
         border-radius: 0;
         :hover {
             background: rgba(0,0,0,.05);
             color: rgba(0,0,0,.95);
         }
         :last-child {
           border-radius: 0 3px 3px 0 !important;
         }`
      : ''};

  ${props =>
    props.type === TabTypes.line && props.active === false
      ? `color: rgba(0,0,0,.95);
         border-radius: 0;
         :hover {
           background: none;
           color: rgba(0,0,0,.95);
         }
         :active {
            background: #f8f8f8;
         }`
      : ''};
`;

export const Title: any = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin: 0 0 30px 0;
`;

export const TabsPointsWrapper: any = styled.ul`
  width: 100%;
  background: #fff;
  padding: 0;
  display: inline-flex;
  list-style: none;
  margin: 0 auto;
  margin-top: 5px;
  border-bottom: 1px solid #e4ebf4;
`;

export const TabPointsWrapper: any = styled.li<ITabWrapperProps>`
  display: block;
  font-size: 15px;
  padding: 12px 10px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  ${props => (props.active === true ? `border-bottom: 2px solid ${props.theme.primary}` : null)};
`;

export const Container: any = styled.div<IContainerWrapperProps>`
  font-family: 'Open Sans', 'Helvetica Neue', Arial, Helvetica, sans-serif;

  ${props => {
    switch (props.type) {
      case TabTypes.center:
        return `width: 100%;
                text-align: center;
                margin: 0 auto;`;
      case TabTypes.line:
        return `display: flex; 
                align-items: center;
                border: 1px solid rgba(34,36,38,.15);
                box-sizing: border-box;
                box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
                border-radius: .28571429rem;
                height: 36px;`;
    }
  }}

  ${TabWrapper} {
    ${props =>
      props.type === TabTypes.line
        ? `
            padding: 2px;
            min-width: 0;
            border: 0px;
            padding: 10px 18px;
            box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            font-size: 12px;
            border-radius: 3px 0 0 3px;
            line-height: 14px;
            display: inline-block;
        `
        : ''};
  }

  ${TabsWrapper} {
    ${props => (props.type === TabTypes.line ? 'border: 0px; line-height: normal; height: 34px;' : '')};
  }

  ${Title} {
    ${props => (props.type === TabTypes.line ? 'margin: 0 10px 0 0; font-weight: normal;' : '')};
  }
`;

export const TabsContainer: any = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const TabsMenu: any = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  box-sizing: border-box;
`;

export const TooltipIcon: any = styled.span`
  @media (max-width: 576px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 992px) {
    display: none;
  }

  background: #cbcfd3;
  display: inline-block;
  color: #fff;
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  text-align: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;

export const TooltipContent: any = styled.span`
  display: none;
  background: #fff;
  width: 300px;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  color: #000;
  text-transform: none;
  padding: 20px;
  position: absolute;
  left: 25px;
  top: -10px;
  z-index: 9999999;
  box-shadow: 0px 5px 15px rgba(0, 52, 86, 0.15);
  text-align: left;

  b {
    font-weight: 600;
  }
`;

export const TooltipWrapper: any = styled.span`
  position: relative;
  top: -10px;
  left: 5px;

  :hover {
    ${TooltipContent} {
      display: block;

      :before {
        position: absolute;
        left: -16px;
        margin: -5px auto 0;
        display: block;
        border: 8px solid #fff;
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
        content: '';
        width: 0;
        z-index: 1;
      }
    }
  }
`;

export const TabsMenuItem: any = styled.span<ITabWrapperProps>`
  height: 40px;
  border-color: #d4d4d5;
  background: #f9f9f9;
  border: 1px solid #d4d4d5;
  padding: 0.92857143em 1.42857143em;
  box-sizing: border-box;
  font-size: 14px;
  color: ${props => props.theme.text};
  border-bottom: 0 !important;
  cursor: pointer;
  display: ${props => (props.isHide ? 'none' : 'flex')};
  align-items: center;
  &:first-child {
    border-radius: 0.28571429rem 0 0 0;
    border-right: 0;
  }
  &:last-child {
    border-radius: 0 0.28571429rem 0 0;
    border-left: 0;
  }
  ${props => `
    &:nth-child(${props.activeIndex + 1}) {
      border-left: 0;
    }
    &:nth-child(${props.activeIndex - 1}) {
      border-right: 0;
    }
  `}
  ${props =>
    props.active &&
    `
    height: 47px;
    border: 2px solid #d4d4d5 !important;
    z-index: 3;
    border-bottom: 0 !important;
    border-width: 2px;
    margin-top: -5px;
    background-color: #f2f2f2;
    border-radius: 0.28571429rem 0.28571429rem 0px 0px !important;
    font-weight: 500;
  `};
`;

export const TabsBody: any = styled.div`
  width: 100%;
  border-radius: 0em 0em 0.28571429rem 0.28571429rem;
  background: #f2f2f2;
  border: 2px solid rgba(34, 36, 38, 0.15);
  padding: 1.75rem;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const TabText: any = styled.span<ITab>``;
