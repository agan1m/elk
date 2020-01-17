import styled from 'styled-components';

interface IProgress {
  progress?: number;
  status?: number;
}

export const ProgressContainer: any = styled.span`
  min-width: 5rem;
  font-size: 0.2rem;
  position: relative;
  display: block;
  max-width: 100%;
  border: none;
  box-shadow: none;
  background: rgba(0, 0, 0, 0.1);
  padding: 0;
  border-radius: 0.28571429rem;
  overflow: hidden;
  @media (max-width: 420px) {
    min-width: 3rem;
  }
  @media (max-width: 360px) {
    min-width: 2rem;
  }
`;

export const Bar: any = styled.span<IProgress>`
  display: block;
  height: 4px;
  line-height: 1;
  position: relative;
  min-width: 2em;
  width: ${props => `${props.progress}%`};
  background: ${props =>
    props.status === 8 || props.status === 9
      ? `${props.theme.error}`
      : props.progress > 95
      ? `${props.theme.green}`
      : props.progress < 100 && props.progress > 20
      ? `${props.theme.success}`
      : '#888'};
  border-radius: 0.28571429rem;
  transition: width 0.4s ease, background-color 0.4s ease;
  ::after {
    content: '';
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    border-radius: 0.28571429rem;
    animation: progress-active 2s ease infinite;
  }
`;
