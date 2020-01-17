import { h, Component } from 'preact';
import { LinkWrapper } from './Wrappers';

interface ILinkWrapperProps {
  href?: string;
  target?: string;
  style?: object;
  onClick?: (...arg: any[]) => void;
  border?: string;
  className?: string;
  event?: boolean;
  disabled?: boolean;
}

export default class Link extends Component<ILinkWrapperProps> {
  constructor(props: any) {
    super(props);
  }

  _handlerOnClick = (event: any) => {
    const { disabled, onClick } = this.props;

    if (disabled) {
      event && event.preventDefault();
      return;
    }
    onClick && event && event.preventDefault();
    onClick && onClick(event);
  };

  render() {
    const { href, target, border, disabled, className, style } = this.props;

    return (
      <LinkWrapper
        className={`esp__link ${className || ''}`}
        disabled={disabled}
        href={href}
        style={style}
        target={target}
        onClick={this._handlerOnClick}
        border={border}
      >
        {this.props.children}
      </LinkWrapper>
    );
  }
}
