import styled from 'styled-components';

interface ILink {
  border: string;
  disabled?: boolean;
}

export const LinkWrapper: any = styled.a<ILink>`
  ${props =>
    props.disabled
      ? `color: ${props.theme.muted} !important; cursor: not-allowed;`
      : `color: ${props.theme.primary} !important; cursor: pointer;`};
  text-decoration: none !important;

  border-bottom: ${props => (props.border ? props.border : 'none')};

  svg {
    vertical-align: bottom;
    ${props =>
      props.disabled
        ? `fill: ${props.theme.muted}; cursor: not-allowed;`
        : `fill: ${props.theme.primary} !important; cursor: pointer;`};
  }
`;
