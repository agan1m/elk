import { h, Component } from 'preact';
import { StepWrapper } from './Wrappers';

import Link from './../../../components/_common/Link';

interface IProps {
  currentStep: number;
  changeStep?: (step: number) => void;
  label?: string;
}

class StepPanel extends Component<IProps> {
  _handlerLocationBack = () => {
    const { changeStep, currentStep } = this.props;

    changeStep(currentStep - 1 || 1);
  };

  render({ label = '' }) {
    return (
      <StepWrapper className="esp__tariffs__step-wrapper">
        <Link onClick={this._handlerLocationBack}>
          <b>❮</b>&nbsp;&nbsp;&nbsp;&nbsp;{label ? label : 'Вернуться'}
        </Link>
      </StepWrapper>
    );
  }
}

export default StepPanel;
