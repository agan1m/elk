import { h, Component } from 'preact';
import Combobox from './../components/_common/Combobox';
import RegistrationModal from './components/RegistrationModal';
import CookieUtil from '../helpers/CookieUtil';
import { setAuthToken, getProfile } from './services';
import { LoginButton, AuthWrapper } from './components/RegistrationModal/Wrappers';
interface IState {
  isLogin: boolean;
  accountData: object;
}

class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLogin: false,
      accountData: {},
    };
  }

  componentDidMount() {
    const callback = (data: CustomEvent) => {
      const { detail = '' } = data || {};
      const accountData = CookieUtil.getCookie('profile') ? JSON.parse(CookieUtil.getCookie('profile')) : null;

      setAuthToken(detail);

      if (accountData) {
        this.setState({ isLogin: true, accountData });
      } else if (detail) {
        getProfile().then(res => {
          const { companyShortName, inn, kpp, email } = res;
          const accountData = { inn, kpp, shortName: companyShortName, email };

          CookieUtil.setCookie('profile', JSON.stringify(accountData));

          this.setState({ isLogin: true, accountData });
        });
      }
    };

    const accountData = CookieUtil.getCookie('profile') ? JSON.parse(CookieUtil.getCookie('profile')) : null;

    if (accountData) {
      this.setState({ isLogin: true, accountData });
    }

    window.removeEventListener('elk_auth', callback);
    window.addEventListener('elk_auth', callback);
  }

  _onLogIn = (isLogin: any, accountData: any) => {
    this.setState({ isLogin, accountData });
  };

  render() {
    const { isLogin, accountData } = this.state;

    return (
      <AuthWrapper className="esp__login">
        {isLogin ? (
          <Combobox onLogIn={this._onLogIn} caption={accountData} />
        ) : (
          <RegistrationModal
            onLogIn={this._onLogIn}
            trigger={<LoginButton className="esp__login__button">Войти</LoginButton>}
          />
        )}
      </AuthWrapper>
    );
  }
}

export default App;
