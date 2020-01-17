import { h, Component } from 'preact';
import { IProps, IState } from './Interfaces';
import { StyledLabel, CheckboxWrapper } from './Wrappers';
import colors from '../../../theme/colors';

class Checkbox extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  _changeCheckedState = (event: any) => {
    const { onChange, checked, id, disabled } = this.props;

    if (disabled) {
      return;
    }

    event.stopPropagation();
    onChange && onChange({ ...event, id, checked: !checked });
  };

  render() {
    const { checked, label, labelTitle, color, disabled, className } = this.props;

    if (checked) {
      return (
        <CheckboxWrapper className={`esp__checkbox ${className || ''}`} disabled={disabled}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            onClick={this._changeCheckedState}
            viewBox="0 0 16 16"
            opacity={disabled ? 0.5 : 1}
          >
            <g fill="none" fillRule="evenodd" stroke={color || colors.grey}>
              <rect width="15" height="15" x=".5" y=".5" strokeWidth={1} rx={2} fill="#FFF" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6.917l3.356 3.894L12.365 5"
                opacity={disabled ? 0.5 : 1}
                stroke={color || colors.black}
                strokeWidth={2.5}
              />
            </g>
          </svg>
          {label ? (
            <StyledLabel
              className="esp__checkbox__styled-label"
              disabled={disabled}
              color={color}
              title={labelTitle}
              onClick={this._changeCheckedState}
            >
              {label}
            </StyledLabel>
          ) : null}
        </CheckboxWrapper>
      );
    }
    return (
      <CheckboxWrapper className="esp__checkbox" disabled={disabled}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          onClick={this._changeCheckedState}
          viewBox="0 0 16 16"
          opacity={disabled ? 0.5 : 1}
        >
          <rect
            width="15"
            height="15"
            x=".5"
            y=".5"
            fill="#FFF"
            fillRule="evenodd"
            stroke={color || colors.grey}
            strokeWidth={1}
            rx={2}
          />
        </svg>
        {label ? (
          <StyledLabel
            className="esp__checkbox__styled-label"
            disabled={disabled}
            color={color}
            title={labelTitle}
            onClick={this._changeCheckedState}
          >
            {label}
          </StyledLabel>
        ) : null}
      </CheckboxWrapper>
    );
  }
}

export default Checkbox;
