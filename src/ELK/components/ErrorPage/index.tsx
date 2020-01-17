import { h, Component } from 'preact';
import { ErrorIcon, ErrorPageWrapper, ErrorText } from './Wrappers';

interface IProps {
  error: string;
}

class ErrorPage extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { error } = this.props;

    return (
      <ErrorPageWrapper className="esp__cabinet__error-page">
        <ErrorIcon className="esp__cabinet__error__icon" />
        <ErrorText className="esp__cabinet__error__text">{error || 'Что-то пошло не так'}</ErrorText>
      </ErrorPageWrapper>
    );
  }
}

export default ErrorPage;
