import { h, Component } from 'preact';
import { injectGlobal } from 'styled-components';

import TariffList from './components/TariffList';
import FirstData from './components/FirstData';
import SecondData from './components/SecondData';
import SuccessPage from './components/SuccessPage';
// import { sendRequest } from './components/SendRequest';
import { ITarif } from './components/TariffList/Interfaces';

import { resetCSS } from './../reset';
import { Consumer } from './context';
import { setAuthToken, getProfile, getAccountData } from './services';
import CookieUtil from './../helpers/CookieUtil';
import CryptoPlugin from './../helpers/CryptoApi';
// import { TYPE } from './../constants';

injectGlobal`
  ${resetCSS()}
`;

interface IProps {
  regionCode: number;
  productType: number;
  utm: any;
}

interface IState {
  post?: string;
  ogrn?: string;
  step: number;
  tariff?: ITarif;
  inn?: string;
  kpp?: string;
  organizationName?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  email?: string;
  comment?: string;
  cert?: any;
  redirectUrl?: string;
  needItems?: string[];
  inProcess: boolean;
  contactEmail?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactMiddleName?: string;
  certFirstName?: string;
  certLastName?: string;
  certMiddleName?: string;
  contactPhone?: string;
  legalAddress?: any;
  snils?: string;
  certificateBodyInBase64?: string;
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    console.log('Create widget app');

    this.state = {
      step: 1,
      tariff: null,
      comment: '',
      inProcess: false,
    };
  }

  componentDidMount() {
    window.addEventListener('elk_auth', this._handlerEvent);

    this._reverData();
  }

  componentWillUnmount() {
    window.removeEventListener('elk_auth', this._handlerEvent);
  }

  _handlerEvent = ({ detail = '' }: CustomEvent) => this._reverData(detail);

  _reverData = async (token?: string) => {
    const profile: any = CookieUtil.getCookie('profile');
    const accountData = profile ? JSON.parse(profile) : {};

    if (!token) {
      token = CookieUtil.getCookie('Token');
    }

    setAuthToken(token);

    if (accountData.inn && token) {
      const { cert } = this.state;

      if ('thumb' in accountData && !cert) {
        this._getCertByThumb(accountData.thumb);
      }

      this.setState({ ...accountData }, this._getOrganizationData);
    } else if (!accountData.inn && token) {
      try {
        const result: any = await getProfile();
        const { companyShortName, inn, kpp, email } = result;
        const profile = { inn, kpp, shortName: companyShortName, email };

        CookieUtil.setCookie('profile', JSON.stringify({ ...accountData, ...profile }));

        this.setState({ ...accountData }, this._getOrganizationData);
      } catch (error) {
        window.console.error(error);
      }
    } else {
      this.setState({
        step: 1,
        inn: '',
        kpp: '',
        cert: null,
        lastName: '',
        firstName: '',
        middleName: '',
        organizationName: '',
        needItems: [],
      });
    }
  };

  _getCertByThumb(thumb: string) {
    const cryptoPlugin = new CryptoPlugin();

    cryptoPlugin.getAllCertificatesFromStore('MY', (error: any, data: any) => {
      if (!error) {
        const { certificates = [] } = data || {};
        const cert: any = certificates.find((cert: any) => cert.thumb === thumb);

        this.setState({ cert });
      }
    });
  }

  _changeStep = async (step: number, data: object = {}) => {
    // const { regionCode, productType, utm } = this.props;

    // if (step === 3 && productType === TYPE.EDO) {
    //   const { redirectUrl } = await sendRequest({ ...this.state, ...data, regionCode, utm });

    //   this._changeStep(4, { redirectUrl });
    // } else {
    this.setState({ step, ...data });
    // }
  };

  _handlerChange = (state: any) => {
    this.setState({ ...state });
  };

  _getOrganizationData = async () => {
    const { inn } = this.state;

    if (!inn) {
      return;
    }

    this.setState({ inProcess: true });

    try {
      const data = await getAccountData(inn, false);

      if (data.description) {
        return;
      }

      this._handlerChange({
        inn: inn,
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
        organizationName: data.companyShortName,
        needItems: data.needItems,
      });
    } catch (error) {
      window.console.log(error);
    } finally {
      this.setState({ inProcess: false });
    }
  };

  _renderStep = (context: any) => {
    const { regionCode, productType, utm } = this.props;
    const {
      step,
      tariff,
      inn,
      kpp,
      organizationName,
      email,
      lastName,
      firstName,
      middleName,
      cert,
      redirectUrl,
      needItems,
      inProcess,
      comment,
    } = this.state;
    const token = CookieUtil.getToken();

    switch (step) {
      case 1:
        return (
          <TariffList
            type={context.type}
            regionCode={regionCode}
            isAuth={token && !!inn && (!!email || !!cert)}
            productType={productType}
            inProccess={inProcess}
            changeStep={this._changeStep}
          />
        );
      case 2:
        return (
          <FirstData
            comment={comment}
            type={context.type}
            regionCode={regionCode}
            step={step}
            tariff={tariff}
            changeStep={this._changeStep}
            onChange={this._handlerChange}
          />
        );
      case 3:
        return (
          <SecondData
            type={context.type}
            comment={comment}
            inProccess={inProcess}
            needItems={needItems}
            regionCode={regionCode}
            utm={utm}
            productType={productType}
            tariff={tariff}
            organizationName={organizationName}
            inn={inn}
            kpp={kpp}
            contactEmail={email}
            contactFirstName={firstName}
            contactLastName={lastName}
            contactMiddleName={middleName}
            contactPhone={''}
            certFirstName={firstName}
            certLastName={lastName}
            certMiddleName={middleName}
            cert={cert}
            changeStep={this._changeStep}
            onChange={this._handlerChange}
          />
        );
      case 4:
        return <SuccessPage isCert={!!cert} redirectUrl={redirectUrl} changeStep={this._changeStep} />;
    }
  };

  render() {
    return (
      <div className="esp__tariffs" style={{ overflow: 'hidden', textAlign: 'left' }}>
        <Consumer>{(context: any) => this._renderStep(context)}</Consumer>
        <div id="tariff-modal-dialog"></div>
      </div>
    );
  }
}

export default App;
