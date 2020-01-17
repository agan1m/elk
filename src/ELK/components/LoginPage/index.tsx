import { h, Component } from 'preact';
import Button from './../../../components/_common/Button';
import Input from './../../../components/_common/Input';
import {
  LoginLine,
  LoginForm,
  Loginlabel,
  ErrorText,
  LinkWrap,
} from '../../../LOGIN/components/RegistrationModal/Wrappers';
import { LoginPageWrapper } from './Wrappers';
import { logIn } from '../../../LOGIN/services';

interface IProps {
  tabId: number;
  onChangeTab: Function;
  onLogIn: Function;
  history: any;
}
interface IState {
  email: string;
  password: string;
  disabled: boolean;
  hasError: boolean;
  formValidate: Record<string, any>;
  error: string;
}

class LoginPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      disabled: false,
      formValidate: {
        email: false,
        password: false,
      },
      hasError: true,
      error: '',
    };
  }

  _setValue = (value: string, hasError: boolean, name: string) => {
    const { formValidate } = this.state;

    this.setState<never>({ [name]: value, formValidate: { ...formValidate, [name]: !hasError } }, this._validateForm);
  };

  _handlerChangetab = () => {
    const { tabId, onChangeTab } = this.props;

    onChangeTab && onChangeTab(tabId);
  };

  _validateForm = () => {
    const { formValidate } = this.state;
    let hasError = false;

    Object.keys(formValidate).forEach(item => {
      if (!formValidate[item]) {
        hasError = true;
      }
    });
    this.setState({ hasError });
  };

  _onLogin = () => {
    const { email, password } = this.state;

    this.setState({ disabled: true });
    logIn({ email, password })
      .then(res => {
        if (res && typeof res === 'object' && res.Error) {
          throw Error(res.Error);
        }
        if (res && typeof res === 'object') {
          this.setState({ disabled: false });
        } else {
          throw Error(res);
        }
      })
      .then(() => {
        const { history } = this.props;

        history.push('/requests');
      })
      .catch(err => {
        const { response = {}, Message = '', message = '' } = err;
        const { data = {} } = response;

        this.setState({ error: data.Message || Message || message, disabled: false });
      });
  };

  _onLoginEnter = e => {
    if (e.key === 'Enter') {
      this._onLogin();
    }
  };

  render() {
    const { disabled, email, password, hasError, error } = this.state;

    return (
      <LoginPageWrapper>
        <LoginForm>
          <LoginLine>
            <Loginlabel>Логин</Loginlabel>
            <Input
              width={'100%'}
              placeholder="Введите логин"
              value={email}
              required={true}
              name="email"
              maxLength={254}
              onChange={this._setValue}
            />
          </LoginLine>
          <LoginLine className="login__password">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Loginlabel>Пароль</Loginlabel>
              {'\n'}
              <LinkWrap to={{ pathname: '/restorepassword', search: `?email=${email}` }} size={'13px'}>
                Забыли пароль?
              </LinkWrap>
            </div>
            <Input
              width={'100%'}
              type="password"
              placeholder="Введите пароль"
              required={true}
              value={password}
              maxLength={255}
              withEye
              name="password"
              onChange={this._setValue}
              onKeyPress={this._onLoginEnter}
            />
          </LoginLine>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <LoginLine styleType={'button'}>
            <Button
              onKeyPress={this._onLoginEnter}
              onClick={this._onLogin}
              width={'100%'}
              disabled={disabled || hasError}
            >
              Войти
            </Button>
          </LoginLine>
        </LoginForm>
      </LoginPageWrapper>
    );
  }
}

export default LoginPage;
