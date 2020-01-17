import styled from 'styled-components';
import { IMenuItem } from './Interfaces';
import colors from '../../../theme/colors';
import { Link } from 'react-router-dom';

export const SidebarContainer: any = styled.div`
  width: 230px;
  box-sizing: border-box;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const SidebarList: any = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  @media (max-width: 992px) {
    flex-direction: row;
  }
  @media (max-width: 600px) {
    padding: 0;
  }
`;

export const SidebarItem: any = styled.li`
  margin: 0.8rem 0;
`;

export const SidebarLink: any = styled(Link)<IMenuItem>`
  background-color: ${props => (props.active ? '#fff' : 'transparent')};
  text-decoration: none;
  cursor: pointer;
  padding: 0.3rem 1rem;
  border-radius: 14px;
  line-height: 1;
  font-weight: 500;
  font-size: 15px;
  color: ${colors.text} !important;
  transition: all 300ms cubic-bezier(0.24, 0.84, 0.26, 0.99);
  box-shadow: ${props => props.active && '0 0 5px 0 rgba(136, 169, 191, 0.25)'};
`;
