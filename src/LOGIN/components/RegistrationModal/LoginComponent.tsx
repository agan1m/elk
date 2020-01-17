import { h, Component } from 'preact';
import Button from './../../../components/_common/Button';
import Input from './../../../components/_common/Input';
import { LoginContainer, LoginLine, LoginForm, Loginlabel, ErrorText, LinkWrapDef, InputContainer } from './Wrappers';
import { logIn } from '../../services';

interface IProps {
  tabId: number;
  onChangeTab: Function;
  onLogIn: Function;
}
interface IState {
  email: string;
  password: string;
  disabled: boolean;
  hasError: boolean;
  formValidate: Record<string, any>;
  error: string;
}

class LoginComponent extends Component<IProps, IState> {
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
      .then(this._requestSuccess)
      .catch(this._requestFailure);
  };

  _onLoginEnter = e => {
    if (e.key === 'Enter') {
      this._onLogin();
    }
  };

  _requestSuccess = res => {
    const { onLogIn } = this.props;

    if (res && typeof res === 'object' && res.Error) {
      throw Error(res.Error);
    }
    if (res && typeof res === 'object') {
      const { AbonentInfo } = res;

      this.setState({ disabled: false }, () => onLogIn(true, AbonentInfo));
      const isSpa = window.location.href.indexOf('account');

      if (isSpa > 0) {
        window.location.href = `${window.location.protocol}//${window.location.host}/account/#/requests`;
      }
    } else {
      throw Error(res);
    }
  };

  _requestFailure = err => {
    const { response = {}, Message = '', message = '' } = err;
    const { data = {} } = response;

    this.setState({ error: data.Message || Message || message, disabled: false });
  };

  render() {
    const { disabled, email, password, hasError, error } = this.state;

    return (
      <LoginContainer className="esp__auth__form__container">
        <LoginForm className="esp__auth__form">
          <LoginLine className="esp__auth__form__line">
            <Loginlabel className="esp__auth__form__label">Логин</Loginlabel>
            <Input
              width={'100%'}
              placeholder="Введите логин"
              value={email}
              required={true}
              name="email"
              maxLength={254}
              onChange={this._setValue}
              className="esp__auth__form__input"
            />
          </LoginLine>
          <LoginLine className="esp__auth__form__line">
            <InputContainer>
              <Loginlabel className="esp__auth__form__label">Пароль</Loginlabel>
              {'\n'}
              <LinkWrapDef
                className="esp__auth__form__reset-link"
                href={`/account/#/restorepassword?email=${email}`}
                size={'13px'}
              >
                Забыли пароль?
              </LinkWrapDef>
            </InputContainer>
            <Input
              width={'100%'}
              type="password"
              placeholder="Введите пароль"
              required={true}
              value={password}
              maxLength={255}
              name="password"
              withEye
              onChange={this._setValue}
              onKeyPress={this._onLoginEnter}
              className="esp__auth__form__input"
            />
          </LoginLine>
          {error ? <ErrorText className="esp__auth__form__error">{error}</ErrorText> : null}
          <LoginLine className="esp__auth__form__line esp__auth__form__line_bottom" styleType={'button'}>
            <Button
              onKeyPress={this._onLoginEnter}
              onClick={this._onLogin}
              width={'100%'}
              disabled={disabled || hasError}
              className="esp__auth__form__button"
            >
              Войти
            </Button>
          </LoginLine>
          <LoginLine className="esp__auth__form__line esp__auth__form__line_bottom" styleType={'button'}>
            <Loginlabel
              className="esp__auth__form__label esp__auth__form__label_small"
              size={'13px'}
              styleType={'button'}
              color={'grey'}
            >
              Нет логина и пароля?
            </Loginlabel>{' '}
            <Button
              className="esp__auth__form__btn esp__auth__form__btn_registration"
              width={'100%'}
              onClick={this._handlerChangetab}
            >
              Зарегистрироваться
            </Button>
          </LoginLine>
        </LoginForm>
      </LoginContainer>
    );
  }
}

export default LoginComponent;
