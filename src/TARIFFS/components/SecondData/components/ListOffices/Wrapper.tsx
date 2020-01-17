import styled from 'styled-components';
import colors from './../../../../../theme/colors';

interface IItemWrapperProps {
  checked: boolean;
}

export const ListWrapper: any = styled.div`
  max-height: 400px;
  overflow: auto;

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

export const ItemWrapper: any = styled.div<IItemWrapperProps>`
  background: ${colors.transparent};
  color: #3c5a7e;
  margin: 0 0 20px 0;
`;

export const ItemContentWrapper: any = styled.div``;

export const LabelWrapper: any = styled.span`
  font-size: 13px;
  margin: 5px;
`;

export const ItemCheckboxWrapper: any = styled.div`
  padding-right: 20px;

  ${LabelWrapper} {
    font-weight: 600;
  }
`;

export const DescriptionWrapper: any = styled.div`
  font-size: 14px;
`;

export const HeaderWrapper: any = styled.div``;
