import styled from 'styled-components';

export const TableWrapper: any = styled.table`
  width: 100%;
  background: #fff;
  margin: 1em 0;
  box-shadow: none;
  border-radius: 0.28571429rem;
  text-align: left;
  color: rgb(106, 127, 152);
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
`;

export const TableBody: any = styled.tbody`
  width: 100%;
`;

export const TableHeader: any = styled.thead`
  font-size: 1em;
  color: rgb(106, 127, 152);
  background: 0px 0px;
  border-spacing: 0px;
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const HeaderCell: any = styled.th`
  padding: 1em;
  cursor: auto;
  text-align: inherit;
  color: #90a4ae;
  vertical-align: inherit;
  font-weight: 600;
  text-transform: none;
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
`;

export const HeaderTitle: any = styled.span`
  color: rgb(144, 164, 174);
  font-weight: 400;
`;

export const BodyRow: any = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    background: #fff !important;
    box-shadow: 0 3px 10px 0 rgba(75, 129, 185, 0.15);
    cursor: pointer;
  }
`;

export const TableCell: any = styled.td`
  padding: 1em;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  @media (max-width: 450px) {
    padding: 0.5em;
  }
`;

export const NoDataWrapper: any = styled.p`
  text-align: center;
  margin: 16px 0;
`;
