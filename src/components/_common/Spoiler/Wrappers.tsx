import styled from 'styled-components';

import spoilerIcon from '../../../../public/images/spoiler-icon.svg';

interface ISpoiler {
  onClick: () => void;
}

interface IOpenSpoiler {
  isOpen: boolean;
}

export const SpoilerWrapper: any = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

export const SpoilerIconWrapper: any = styled.span<IOpenSpoiler>`
  transform: ${props => (props.isOpen ? 'rotate(90deg)' : '')};
  display: inline-block;
  margin-right: 5px;
  transition: all 0.2s ease;
  user-select: none;
  background: url(${spoilerIcon}) 100% 100% no-repeat;
  width: 8px;
  height: 16px;
`;

export const SpoilerInnerWrapper: any = styled.div<IOpenSpoiler>`
  max-height: ${props => (props.isOpen ? '' : '0')};
  overflow: ${props => (props.isOpen ? '' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: 0.5s;
`;

export const SpoilerContentWrapper: any = styled.div`
  font-size: 16px;
  width: 100%;
`;

export const SpoilerHeaderWrapper: any = styled.div<ISpoiler>`
  cursor: pointer;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  color: #3c5a7e;
`;
