import { h, Component } from 'preact';

import {
  SpoilerWrapper,
  SpoilerHeaderWrapper,
  SpoilerInnerWrapper,
  SpoilerContentWrapper,
  SpoilerIconWrapper,
} from './Wrappers';

interface IProps {
  label: string;
  onClick?: (...args: any[]) => void;
  isOpen?: boolean;
}

interface IState {
  isOpen: boolean;
}

export default class Spoiler extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  _toggleIsOpen = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  _handlerClick = () => {
    const { onClick, isOpen: isOpenProp } = this.props;

    onClick && onClick();

    if (isOpenProp == null) {
      this._toggleIsOpen();
    }
  };

  render() {
    const { label, isOpen: isOpenProp } = this.props;
    const { isOpen: isOpenState } = this.state;

    const isOpen = isOpenProp == null ? isOpenState : isOpenProp;

    return (
      <SpoilerWrapper className="esp__spoiler">
        <SpoilerHeaderWrapper className="esp__spoiler__header-wrapper" onClick={this._handlerClick}>
          <SpoilerIconWrapper className="esp__spoiler__icon-wrapper" isOpen={isOpen}></SpoilerIconWrapper>
          <span>{label || ''}</span>
        </SpoilerHeaderWrapper>
        <SpoilerInnerWrapper className="esp__spoiler__inner-wrapper" isOpen={isOpen}>
          <SpoilerContentWrapper className="esp__spoiler__content-wrapper">{this.props.children}</SpoilerContentWrapper>
        </SpoilerInnerWrapper>
      </SpoilerWrapper>
    );
  }
}
