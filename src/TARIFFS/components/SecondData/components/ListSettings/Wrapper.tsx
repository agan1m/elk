import styled from 'styled-components';

interface IItemWrapperProps {
  checked: boolean;
}

export const ItemWrapper: any = styled.div<IItemWrapperProps>`
  padding: 20px 13px;
  background: ${props => props.theme.transparent};
`;

export const ItemContentWrapper: any = styled.div``;

export const CheckBoxWrapper: any = styled.div`
  display: inline-block;
  width: 40px;
  vertical-align: middle;
  margin: 0 10px;
  cursor: pointer;
`;

export const ItemCheckboxWrapper: any = styled.div`
  padding-right: 20px;
  user-select: none;
`;

export const LabelWrapper: any = styled.span`
  font-size: 14px;

  b {
    color: #3c5a7e;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const DescriptionWrapper: any = styled.div`
  font-size: 14px;
`;
