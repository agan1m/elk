import { h, Component } from 'preact';
import CryptoPlugin from '../../../helpers/CryptoApi';
import CertList from './../../../components/CertModal/CertList';
import { CertItem, CertLeftCell, CertTable } from './../../../components/CertModal/Wrappers';
import WorkspaceError from './../../../components/CertModal/WorkspaceError';
import { ScrollContainer } from './../../../components/CertModal/Wrappers';
import { ICert } from './../../../components/CertModal/Interfaces';
import { certLogin } from '../../services';
import CookieUtil from '../../../helpers/CookieUtil';
import { KppTitle } from './Wrappers';

interface IProps {
  onLogIn: Function;
  onRegistration: Function;
}
interface IState {
  needKpp: boolean;
  cert: ICert;
  ind: number;
  kppList: {
    Kpp: string;
    CompanyName: string;
  }[];
  error: string;
  certs: Array<any>;
  errorMsg: string;
  errorInd: number;
}

const AuthToken = 'andrew';

class CertModal extends Component<IProps, IState> {
  cryptoPlugin: any;
  constructor(props: IProps) {
    super(props);
    this.cryptoPlugin = new CryptoPlugin();
    this.state = {
      certs: [],
      cert: null,
      ind: 0,
      kppList: [],
      needKpp: false,
      error: null,
      errorMsg: '',
      errorInd: null,
    };
  }

  componentDidMount() {
    this._cryptoInit().then((result: any) => {
      const { data = {}, error } = result;
      const { certificates } = data;

      this.setState({ certs: certificates, error });
    });
  }

  _cryptoInit = () => {
    return new Promise(resolve => {
      this.cryptoPlugin.getAllCertificatesFromStore('MY', (error: any, data: any) => {
        resolve({ error, data });
      });
    });
  };

  _handlerSelectCert = (cert: ICert, ind: number, kpp?: string) => {
    const { onLogIn } = this.props;

    this.cryptoPlugin.performSign(AuthToken, cert.thumb, (error: any, data: any) => {
      if (error) {
        this.setState({ error: 'Произошла ошибка при получении тела сертификата' });
        return null;
      }
      this.setState({ errorMsg: '', errorInd: null });

      certLogin({
        SignedToken: data['sign_content'],
        Thumbprint: cert.thumb,
        Inn: cert.inn,
        AuthToken: AuthToken,
        Kpp: kpp,
      })
        .then((res: any) => {
          const { AbonentInfo, Subsidiaries } = res;

          if (Subsidiaries && Subsidiaries.length) {
            this.setState({ needKpp: true, kppList: Subsidiaries, cert, ind });
            return;
          }

          onLogIn(true, { ...AbonentInfo, thumbprint: cert.thumb });
          const isSpa = window.location.href.indexOf('account');

          if (isSpa > 0) {
            window.location.href = `${window.location.protocol}//${window.location.host}/account/#/requests`;
          }
        })
        .then(() => {
          const profile = JSON.parse(CookieUtil.getCookie('profile'));

          if (profile) {
            CookieUtil.setCookie('profile', JSON.stringify({ ...profile, thumb: cert.thumb }));
          }
        })
        .catch((err: any) => {
          window.console.error(err);
          const message = err.Message || err.message;

          this.setState(
            { errorMsg: message, errorInd: ind },
            () => message.indexOf('не найдена') > -1 && this._onRegistrationByInn(cert.inn),
          );
        });
    });
  };

  _onRegistrationByInn(inn: any) {
    const { onRegistration } = this.props;

    onRegistration && onRegistration(inn);
  }

  _renderKppOrganizationListTemplate() {
    const { cert, ind, kppList } = this.state;

    return kppList.map((item, index) => (
      <CertItem
        key={index}
        className="esp__cert-modal__item"
        onClick={() => this._handlerSelectCert(cert, ind, item.Kpp)}
      >
        <CertLeftCell className="esp__cert-modal__left-cell">
          <div style={{ lineHeight: '38px' }}>
            <span style={{ fontWeight: '600' }}>{item.CompanyName}</span>, КПП {item.Kpp}
          </div>
        </CertLeftCell>
      </CertItem>
    ));
  }

  render() {
    const { certs, error, errorMsg, errorInd, needKpp } = this.state;

    return (
      <div style={{ width: 600 }}>
        {needKpp ? <KppTitle>Выберите филиал</KppTitle> : null}
        {error ? (
          <WorkspaceError error={error} />
        ) : (
          <ScrollContainer>
            {needKpp ? (
              <div className="esp__login__kpp-list">
                <CertTable className="esp__cert-modal__list">{this._renderKppOrganizationListTemplate()}</CertTable>
              </div>
            ) : (
              <CertList errorInd={errorInd} errorMsg={errorMsg} onSelect={this._handlerSelectCert} certs={certs} />
            )}
          </ScrollContainer>
        )}
      </div>
    );
  }
}

export default CertModal;
