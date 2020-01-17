import { h, Component } from 'preact';
import { TooltipLabel, TooltipWrapper, TooltipContainer } from './Wrappers';
import QuestionIcon from '../../Icons/QuestionIcon';
import colors from '../../../theme/colors';

interface IProps {
  isHovered?: boolean;
  children?: any;
  message: string;
}

interface IState {
  isOpened: boolean;
}

export default class Tooltip extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpened: false,
    };
  }

  _handlerClickIcon = (event: any) => {
    const { isOpened } = this.state;

    event && event.preventDefault();
    event && event.stopPropagation();

    this.setState({
      isOpened: !isOpened,
    });
  };

  _handlerClickContainer = (event: any) => {
    event && event.stopPropagation();
  };

  _handlerMouseEnter = (event: any) => {
    event && event.stopPropagation();

    this.setState({
      isOpened: true,
    });
  };

  _handlerMouseLeave = (event: any) => {
    event && event.stopPropagation();

    this.setState({
      isOpened: false,
    });
  };

  render() {
    const { children, isHovered, message } = this.props;
    const { isOpened } = this.state;

    return (
      <TooltipWrapper className="esp__tooltip">
        <TooltipLabel
          className="esp__tooltip__label"
          onMouseEnter={isHovered && this._handlerMouseEnter}
          onMouseLeave={isHovered && this._handlerMouseLeave}
          onClick={!isHovered && this._handlerClickIcon}
        >
          {children && children.length > 0 ? children : <QuestionIcon color={colors.link} />}
        </TooltipLabel>
        {isOpened ? (
          <TooltipContainer
            className="esp__tooltip__container"
            messageLength={message && message.length}
            onClick={this._handlerClickContainer}
          >
            {isHovered ? null : <span onClick={this._handlerClickIcon} />}
            <span>{message}</span>
          </TooltipContainer>
        ) : null}
      </TooltipWrapper>
    );
  }
}
