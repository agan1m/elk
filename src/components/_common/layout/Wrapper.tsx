import styled from 'styled-components';

export const PageLayout: any = styled.div`
  width: 100%;
  padding: 50px 0 10px 0;
  margin: 0 auto;
  /* background: ${props => props.theme.neutral}; */
  display: flex;
  font-family: 'Open Sans', sans-serif;

  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
    
  }
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const ElkPageLayout: any = styled.div`
  width: calc(100% - 230px);
  background-color: #fff;
  color: ${props => props.theme.text};
  padding: 2rem 3rem 2rem 3rem !important;
  display: flex;
  min-height: 400px;
  box-sizing: border-box;
  margin: 0 auto !important;
  @media (max-width: 992px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    padding: 1rem 2rem 2rem 1rem !important;
  }
`;

export const Layout: any = styled.div`
  width: 100%;
  background: ${props => props.theme.neutral};
`;
