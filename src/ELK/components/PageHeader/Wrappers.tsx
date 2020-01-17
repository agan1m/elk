import styled from 'styled-components';
import colors from '../../../theme/colors';

interface IStatus {
  step?: number;
}

export const HeaderTopLine: any = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  svg {
    fill: ${colors.text};
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const HeaderTitle: any = styled.span`
  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const ArrowBack: any = styled.span`
  font-size: 20px;
  transform: rotate(90deg);
  margin: 5px 15px 0 -22px;
  cursor: pointer;
  @media (max-width: 600px) {
    margin: 5px 15px 0 -5px;
  }
`;

export const HeaderIconWrapper: any = styled.span`
  svg {
    fill: ${colors.text};
  }
  margin-right: 5px;
`;

export const HeaderSubLine: any = styled.p`
  margin: 10px 0 10px 46px;
  @media (max-width: 600px) {
    margin: 5px 0 5px 61px;
    font-size: 13px;
  }
`;

export const StatusText: any = styled.span<IStatus>`
  color: ${props =>
    props.step > 1 && props.step < 7
      ? `${colors.success}`
      : props.step >= 7 && props.step < 8
      ? `${colors.green}`
      : props.step === 8 || props.step === 9
      ? `${colors.error}`
      : `${colors.text}`};
`;
