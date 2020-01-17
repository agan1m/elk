import { h, Component } from 'preact';
import { Slider } from 'preact-range-slider';
import { RangeWrapper } from './Wrappers';

interface IProps {
  disabled?: boolean;
  marks?: {
    [key: number]: string;
  };
  min?: number;
  max?: number;
  defaultValue?: any;
  step?: any;
  dots?: any;
  tipFormatter?: (val: number) => any;
  onChange: (val: number) => any;
  onAfterChange?: (val: number) => any;
}

interface IState {
  value?: any;
  disabled?: boolean;
}

class RangeInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  _renderTipTemplate = (value: number) => {
    const { marks } = this.props;

    return <span>{marks[value]}</span>;
  };

  render() {
    const {
      marks,
      min,
      max,
      defaultValue,
      step,
      dots,
      tipFormatter = this._renderTipTemplate,
      onChange,
      onAfterChange,
    } = this.props;

    return (
      <RangeWrapper>
        <Slider
          tipFormatter={tipFormatter}
          dots={dots}
          min={min}
          max={max}
          defaultValue={defaultValue}
          marks={marks}
          step={step}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
      </RangeWrapper>
    );
  }
}

export default RangeInput;
