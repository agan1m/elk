import { h, Component } from 'preact';
import { SelectWrapper, SelectContainer } from './Wrappers';

interface IProps {
  options: object[];
  optionValue: string;
  optionText: string;
  optionCaption?: string;
  optionCaptionPrefix?: string;
  value?: any;
  disabled?: boolean;
  onValidate?: (...args: any[]) => void;
  onChange?: (...args: any[]) => void;
  testID?: string;
  width?: string;
}

interface IState {
  options: object[];
  optionValue: string;
  optionText: string;
  optionCaption?: string;
  optionCaptionPrefix?: string;
  value?: any;
  disabled?: boolean;
  isError: boolean;
  error: object;
}

export default class SimpleStrategy extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      options: props.options,
      optionValue: props.optionValue,
      optionText: props.optionText,
      optionCaption: props.optionCaption,
      optionCaptionPrefix: props.optionCaptionPrefix || '',
      value: props.value || -1,
      disabled: props.disabled || false,
      isError: false,
      error: {
        message: '',
      },
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      options: nextProps.options,
      value: nextProps.value,
      disabled: nextProps.disabled,
    });
  }

  _createOption(index: any, option: any) {
    const { optionText, optionValue } = this.state;

    return (
      <option key={index} value={option[optionValue]}>
        {option[optionText]}
      </option>
    );
  }

  _handlerChange(event: any) {
    const { onChange } = this.props;
    const value = event.target.value;

    this.setState(
      {
        value: value,
      },
      () => onChange(value),
    );
  }

  render() {
    const { options, value, optionCaption, optionCaptionPrefix, disabled, isError, error } = this.state;

    return (
      <SelectContainer className="esp__select">
        <SelectWrapper
          className="esp__select-wrapper"
          {...this.props}
          value={value}
          disabled={disabled}
          onChange={this._handlerChange.bind(this)}
        >
          {optionCaption ? (
            <option className="esp__select-option" key={-1} value={-1}>
              {optionCaptionPrefix ? optionCaptionPrefix + optionCaption : optionCaption}
            </option>
          ) : null}
          {options.map((option, index) => this._createOption(index, option))}
        </SelectWrapper>
        {isError ? (
          error['message'] ? (
            <span className="esp__select__error-message">{error['message']}</span>
          ) : null
        ) : null}
      </SelectContainer>
    );
  }
}
