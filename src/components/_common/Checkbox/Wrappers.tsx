import styled from 'styled-components';

interface ILabel {
  color: string;
  disabled?: boolean;
}

export const StyledLabel: any = styled.label<ILabel>`
  margin-left: 0.714em !important;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')} !important;
  color: ${props => (props.color ? props.color : props.theme.black)} !important;
  font-weight: 500 !important;
  &:hover {
    opacity: 0.9;
  }
`;

export const CheckboxWrapper: any = styled.span`
  position: relative;
  display: inline-block;
  svg {
    cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  }
`;
