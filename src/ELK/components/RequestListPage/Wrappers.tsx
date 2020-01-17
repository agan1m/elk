import styled from 'styled-components';

import icon from '../../../../public/images/tick.svg';
import warning from '../../../../public/images/exclamation-sign.svg';
import clock from '../../../../public/images/clock.svg';
import danger from '../../../../public/images/x-button.svg';

interface IStatus {
  progress?: number;
  status?: number;
}

function getCurrentImage(progress: number, status: number) {
  if (status === 8 || status === 9) {
    return danger;
  }
  if (Math.ceil(progress) > 95) {
    return icon;
  }
  if (progress > 20) {
    return warning;
  }
  return clock;
}

export const StatusContainer: any = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusIcon: any = styled.span<IStatus>`
  background-image: ${props => `url(${getCurrentImage(props.progress, props.status)})`};
  padding: 8px;
  background-repeat: no-repeat;
  margin-right: 5px;
  background-size: contain;
`;

export const PayedIcon: any = styled.span`
  margin-left: 5px;
`;

export const DropdownWrapper: any = styled.span`
  margin: 0 14px 14px 0;
`;

export const FilterLine: any = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CountText: any = styled.span`
  font-size: 14px;
`;

export const SearchWrapper: any = styled.div`
  padding-top: 6px;
`;

export const RequestTypeWrapper: any = styled.span`
  display: flex;
  align-items: center;
`;

export const RequestTypeContainer: any = styled.span`
  span > span {
    margin-left: 5px;
    font-weight: 500;
    color: #000;
    font-size: 13px;
  }
`;

export const TableWrapper: any = styled.div`
  width: 100%;
  @media (max-width: 360px) {
    & > table > thead > tr > th:first-child > span {
      display: none;
    }
  }
`;

export const RequestTypeText: any = styled.span`
  line-height: 20px;
  @media (max-width: 490px) {
    display: none;
  }
`;
