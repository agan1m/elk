'use strict';

import { h, Component } from 'preact';
import { IProps, IState } from './Interfaces';
import {
  InputContainer,
  DropdownContainer,
  DropdownList,
  DropdownItem,
  SelectText,
  DropdownIcon,
  CloseIconWrapper,
} from './Wrappers';
import CloseIcon from '../../../components/Icons/CloseIcon';

export default class DropList extends Component<IProps, IState> {
  _closeStop: any;
  constructor(props: IProps) {
    super(props);

    this._closeStop = false;

    this.state = this._setState(props);
  }

  componentDidMount() {
    document.addEventListener('click', this._handlerHideList);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handlerHideList);
  }

  componentWillReceiveProps(nextProps:IProps) {
    this.setState(this._setState(nextProps));
  }

  _handlerHideList = () => {
    if (this._closeStop) {
      this._closeStop = false;
      return;
    }

    this._toggleList(false);
  };

  _setState(state: any) {
    return {
      options: state.options || [],
      optionValue: state.optionValue || null,
      optionText: state.optionText || '',
      optionCaption: state.optionCaption || '',
      value: state.value !== null && state.value !== undefined ? state.value : -1,
      disabled: state.disabled || false,
      isOpened: state.isOpened || false,
    };
  }

  _toggleList(state = true) {
    this.setState({
      isOpened: state,
    });
  }

  _handlerClickCaption = (event: any) => {
    const { disabled } = this.props;
    const { isOpened } = this.state;

    if (disabled) {
      return;
    }

    event && event.stopPropagation();
    event && event.preventDefault();

    this._closeStop = true;

    this._toggleList(!isOpened);
  };

  _handlerClickItem(value: any, event: any) {
    const { disabled, onChange } = this.props;

    if (disabled) {
      return;
    }

    event && event.stopPropagation();
    event && event.preventDefault();

    this.setState({
      value: value,
    });

    if (onChange) {
      onChange.call(this, value);
    }

    this._toggleList(false);
  }

  _clearValue = (event: any) => {
    const { onChange } = this.props;
    event.stopPropagation();

    this.setState({ value: -1 });

    if (onChange) {
      onChange.call(this, -1);
    }
  };

  _getSelectedCaption() {
    const { options, optionCaption, optionText, optionValue, value } = this.state;
    const option = options.filter(item => item[optionValue] === value)[0];

    return option ? <SelectText>{option[optionText]}</SelectText> : optionCaption;
  }

  render() {
    const { width } = this.props;
    const { options, optionValue, optionText, value, isOpened } = this.state;

    return (
      <DropdownContainer className="esp__dropdown">
        <InputContainer className="esp__dropdown__input-container" width={width} onClick={this._handlerClickCaption}>
          {this._getSelectedCaption()}
          {value > 0 ? (
            <CloseIconWrapper className="esp__dropdown__close-icon-wrapper" onClick={this._clearValue}>
              <CloseIcon width={15} height={15} />
            </CloseIconWrapper>
          ) : (
            <DropdownIcon className="esp__dropdown__icon" />
          )}
        </InputContainer>
        {isOpened ? (
          <DropdownList className="esp__dropdown__list" width={width}>
            {/* optionCaption ? (
              <span
                key={-1}
                className={'esp__dropdown__list__item' + (value === -1 ? ' esp__dropdown__list__item--active' : '')}
                onMouseDown={this._handlerClickItem.bind(this, -1)}
              >
                <span className="tp-paragraph">{optionCaption}</span>
              </span>
            ) : null */}
            {options.map((item, key) => {
              return (
                <DropdownItem
                  key={key}
                  className={'esp__dropdown__item' + (value === item[optionValue] ? ' esp__dropdown__item--active' : '')}
                  onMouseDown={this._handlerClickItem.bind(this, item[optionValue])}
                >
                  <span>{item[optionText] || ''}</span>
                </DropdownItem>
              );
            })}
          </DropdownList>
        ) : null}
      </DropdownContainer>
    );
  }
}
