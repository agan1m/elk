import styled from 'styled-components';

export const ComboboxWrapper: any = styled.div`
  color: rgb(104, 131, 156);
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  font-size: 15px;
  display: inline-block;
  width: 245px;
  border: none;
  border-radius: 0;
  margin: 0;
  position: relative;
  &__item {
    padding: 5px 0;
  }

  &__link {
    color: #8c98a6;
  }

  &:empty {
    border: none;
  }
`;

export const ComboboxHeader: any = styled.div`
  text-align: right;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 5px;
  cursor: pointer;
`;

export const ComboboxContainer: any = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  top: 50px;
  position: absolute;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 10px 0px;
  border-radius: 2px;
  transition: opacity 0.1s ease;
  border: 1px solid rgba(34, 36, 38, 0.15);
  background-color: #fff;
  z-index: 9999;
  &::before {
    right: 46%;
    content: '';
    position: absolute;
    top: -9px;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    border-right: 0;
    border-bottom: 0;
    transform: rotate(45deg);
  }

  &::after {
    top: 1px;
    border-top: none;
    border-left-color: transparent;
    border-right-color: transparent;
    z-index: 1000;
  }
`;

export const ComboboxItem: any = styled.div`
  padding: 14px 12px;
  cursor: pointer;
  text-align: left;
  display: flex;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 10px 0px;
    color: rgba(0, 0, 0, 0.95);
    background: rgb(255, 255, 255);
  }
`;

export const IconWrap: any = styled.span`
  svg {
    fill: rgb(104, 131, 156);
  }
`;

export const ComboboxItemName: any = styled.span`
  padding-top: 3px;
  margin-left: 15px;
`;
