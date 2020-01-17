import styled from 'styled-components';

interface ITooltip {
  messageLength?: number;
}

export const TooltipWrapper: any = styled.span`
  position: relative;
`;

export const TooltipLabel: any = styled.span`
  cursor: pointer;
`;

export const TooltipContainer: any = styled.span<ITooltip>`
  position: absolute;
  max-width: 250px;
  z-index: 9999;
  min-width: ${props => (props.messageLength > 15 ? '185px' : 'min-content')};
  border: 1px solid #d4d4d5;
  padding: 0.833em 1em;
  border-radius: 0.28571429rem;
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  bottom: calc(100% + 0.71428571em);
  left: 0;
  :before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 4px;
    width: 0.71428571em;
    height: 0.71428571em;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: 1px 1px 0px 0px #bababc;
  }
`;
