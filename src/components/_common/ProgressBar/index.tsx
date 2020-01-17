import { h, Component } from 'preact';
import { ProgressContainer, Bar } from './Wrappers';

interface IProps {
  progress?: number;
  status?: number;
}

class ProgressBar extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { progress, status } = this.props;

    return (
      <ProgressContainer className="esp__progress">
        <Bar className="esp__progress__bar" status={status} progress={progress} />
      </ProgressContainer>
    );
  }
}

export default ProgressBar;
