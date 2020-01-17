import { h, Component } from 'preact';
import { SendAgain } from './../../../TARIFFS/components/FirstData/Wrappers';

interface IProps {
  onSendAgain: Function;
}
interface IState {
  seconds: number;
}

const TIMER_INTERVAL_IN_SECONDS = 60;

class RegistrationComponent extends Component<IProps, IState> {
  public _timer: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      seconds: TIMER_INTERVAL_IN_SECONDS,
    };
    this._timer = null;
  }

  componentDidMount() {
    this.timerStart();
  }

  _handlerSendAgain = () => {
    const { onSendAgain } = this.props;

    this.setState(
      {
        seconds: TIMER_INTERVAL_IN_SECONDS,
      },
      () => onSendAgain && onSendAgain(),
    );
  };

  _timerIncrement = () => {
    const { seconds } = this.state;

    if (seconds <= 0) {
      window.clearInterval(this._timer);
    } else {
      this.setState({
        seconds: seconds - 1,
      });
    }
  };

  timerStart = () => {
    this.setState({
      seconds: TIMER_INTERVAL_IN_SECONDS,
    });
    this._timer = setInterval(this._timerIncrement, 1000);
  };

  render() {
    const { seconds } = this.state;

    return seconds <= 0 ? (
      <SendAgain className="esp__auth__form__code_text" onClick={this._handlerSendAgain}>
        Запросить еще раз
      </SendAgain>
    ) : (
      <SendAgain
        className="esp__auth__form__code_text"
        disabled={true}
      >{`Запросить еще раз через ${seconds}`}</SendAgain>
    );
  }
}

export default RegistrationComponent;
