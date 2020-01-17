import { h, Component } from 'preact';
import PageHeader from '../PageHeader';
import StepsComponent from './StepsComponent';
import TabsComponent from './TabsComponent';
import { PageWrapper, InfoStatusWrapper } from './Wrappers';
import { getRequest } from '../../../LOGIN/services';
import Loader from '../../../components/_common/Loader';
import ErrorPage from '../ErrorPage';
import AppSettings from '../../../appSettings';
interface IProps {
  match: any;
}
interface IState {
  isLoading: boolean;
  error: string;
  paymentLink: string;
  request: any;
  connectionData: any;
  documents: any;
}

class RequestPage extends Component<IProps, IState> {
  _requestTimer: any;
  constructor(props: IProps) {
    super(props);

    this.state = {
      isLoading: false,
      error: '',
      request: {},
      connectionData: {},
      documents: {},
      paymentLink: '',
    };
    this._requestTimer = null;
  }

  componentDidMount() {
    this._getRequest(true);
    this._requestTimer = setInterval(() => this._getRequest(false), AppSettings.DELAY_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this._requestTimer);
  }

  _getRequest = (isFirst: any) => {
    const { match = {} } = this.props;
    const { params = {} } = match;

    this.setState({ isLoading: isFirst });
    getRequest(params.requestId)
      .then(res => {
        const { commonRequest, connectionData, documents, paymentLink } = res;

        this.setState({ isLoading: false, request: commonRequest, connectionData, documents, paymentLink });
      })
      .catch(err => {
        this.setState({ isLoading: false, error: 'Что-то пошло не так' });
        console.error(err);
      });
  };

  render() {
    const { isLoading, error, connectionData = {}, request = {}, documents = {}, paymentLink } = this.state;
    const { status } = request;
    const { wasUsedCertInEsp } = connectionData;

    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorPage error={error} />;
    }

    return (
      <div style={{ width: '100%' }}>
        <PageHeader {...request} />
        {status > 0 && status < 6 ? (
          <InfoStatusWrapper>
            Счета для оплаты скоро будут доступны.
            <br /> Также документы будут направлены на указанный при регистрации e-mail.
            <br />
            Обычно документы становятся доступны в течение 15 минут.
          </InfoStatusWrapper>
        ) : null}
        <PageWrapper className="esp__cabinet__request__page-container">
          <StepsComponent usedCert={wasUsedCertInEsp} paymentLink={paymentLink} documents={documents} step={status} />
          <TabsComponent data={connectionData} />
        </PageWrapper>
      </div>
    );
  }
}

export default RequestPage;
