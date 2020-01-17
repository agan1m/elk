import { h, Component } from 'preact';
import { SpinnerWrapper, SpinnerContentWrapper } from './../TariffList/Wrapper';

interface IProps {
  isCert: boolean;
  changeStep: (step: number, data?: object) => void;
  redirectUrl: string;
}

export default class SuccessPage extends Component<IProps> {
  componentDidMount() {
    const { redirectUrl } = this.props;

    const requestId = redirectUrl.split('requestId=')[1];

    if (requestId) {
      window.location.href = `/account/#/requests/${requestId}`;
    }
  }

  render() {
    return (
      <SpinnerContentWrapper>
        <SpinnerWrapper />
      </SpinnerContentWrapper>
    );
  }
}
