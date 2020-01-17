import { h, Component } from 'preact';
import qs from 'qs';
import Button from './../../../components/_common/Button';
import Input from './../../../components/_common/Input';
import { restorePassword } from '../../../LOGIN/services';
import {
  Label,
  ErrorText,
  SuccessWrapper,
  Title,
  ResetWrapper,
  LoginFormRestore,
  RestoreLine,
  ButtonLine,
  RestoreText,
} from './Wrappers';
import CookieUtil from '../../../helpers/CookieUtil';

interface IProps {
  tabId: number;
  onChangeTab: Function;
  onLogIn: Function;
  location: any;
}
interface IState {
  email: string;
  successMessage: any;
  disabled: boolean;
  hasError: boolean;
  hidePass: boolean;
  formValidate: Record<string, any>;
  error: string;
}

class ResetPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      disabled: false,
      formValidate: {
        email: false,
      },
      hasError: true,
      hidePass: true,
      error: '',
      successMessage: '',
    };

    this._setState();
  }

  _setState() {
    const { search } = this.props.location;

    const params = search && qs.parse(search.slice(1));

    if (params && params.email) {
      return this.setState({ email: params.email, formValidate: { email: true } }, this._validateForm);
    }

    const profile: any = JSON.parse(CookieUtil.getCookie('profile'));

    if (profile && profile.email) {
      this.setState({ email: profile.email, formValidate: { email: true } }, this._validateForm);
    }
  }

  _setValue = (value: string, hasError: boolean, name: string) => {
    const { formValidate } = this.state;

    this.setState<never>(
      { [name]: value, error: '', formValidate: { ...formValidate, [name]: !hasError } },
      this._validateForm,
    );
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

  _onRestorePassword = () => {
    const { email } = this.state;

    this.setState({ disabled: true });
    restorePassword({ Email: email.trim() })
      .then(res => {
        if (typeof res === 'boolean') {
          this.setState({
            disabled: false,
            successMessage: (
              <span>{`На адрес ${email} отправлено письмо, содержащее инструкцию по изменению пароля.`}</span>
            ),
          });
        } else {
          throw new Error(res.Error || 'Что-то пошло не так');
        }
      })
      .catch(err => {
        window.console.error(err.message);
        this.setState({ error: err.message, disabled: false });
      });
  };

  _onLoginEnter = (e: any) => {
    if (e.key === 'Enter') {
      this._onRestorePassword();
    }
  };

  render() {
    const { disabled, email, hasError, error, successMessage } = this.state;

    return (
      <ResetWrapper className="esp__cabinet__restore__container">
        <Title className="esp__cabinet__restore__title">Восcтановление пароля</Title>
        {successMessage ? (
          <SuccessWrapper className="esp__cabinet__restore__success">
            <p>{successMessage}</p>
          </SuccessWrapper>
        ) : (
          <LoginFormRestore className="esp__cabinet__restore__form">
            <RestoreText className="esp__cabinet__restore__form__text">
              Укажите электронную почту кабинета, для которого хотите восстановить пароль
            </RestoreText>
            <RestoreLine className="esp__cabinet__restore__form__line">
              <Label className="esp__cabinet__restore__form__line__label" display={'inline-block'}>
                E-mail:
              </Label>
              <span style={{ width: 'calc(100% - 58px)' }}>
                <Input
                  className="esp__cabinet__restore__form__input"
                  placeholder="Введите электронную почту"
                  required={true}
                  value={email}
                  width={'100%'}
                  name="email"
                  maxLength={254}
                  validKey="email"
                  validateAfterMount={true}
                  onChange={this._setValue}
                />
              </span>
            </RestoreLine>
            {error ? <ErrorText className="esp__cabinet__restore__error">{error}</ErrorText> : null}
            <ButtonLine className="esp__cabinet__restore__form__line esp__cabinet__restore__form__line_bottom">
              <Button className="esp__cabinet__restore__form__btn" href="/account/#/requests" disabled={disabled}>
                Отмена
              </Button>
              <Button
                className="esp__cabinet__restore__form__btn esp__cabinet__restore__form__btn_primary"
                onKeyPress={this._onLoginEnter}
                onClick={this._onRestorePassword}
                disabled={disabled || hasError}
                primary
              >
                Восстановить
              </Button>
            </ButtonLine>
          </LoginFormRestore>
        )}
      </ResetWrapper>
    );
  }
}

export default ResetPage;
