import styled from 'styled-components';
import { SpinnerWrapper } from './../_common/Loader/Wrappers';

export const MapWrapper: any = styled.div`
  min-width: 720px;
  min-height: 400px;
  text-align: center;

  ${SpinnerWrapper} {
    margin-top: 150px;
  }
`;
