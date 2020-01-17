import { h, Component } from 'preact';
import { Link } from 'react-router-dom';
import qs from 'qs';
import Button from './../../../components/_common/Button';
import Input from './../../../components/_common/Input';
import { LoginLine, Loginlabel } from '../../../LOGIN/components/RegistrationModal/Wrappers';
import { resetPasswordConfirm } from '../../../LOGIN/services';
import Checkbox from '../../../components/_common/Checkbox';
import { CheckboxWrapper, ErrorText, SuccessWrapper, Title, ResetWrapper, LoginForm } from './Wrappers';

interface IProps {
  tabId: number;
  onChangeTab: Function;
  onLogIn: Function;
  location: any;
}
interface IState {
  password: string;
  passwordRecovery: string;
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
      password: '',
      passwordRecovery: '',
      disabled: false,
      formValidate: {
        passwordRecovery: false,
        password: false,
      },
      hasError: true,
      hidePass: true,
      error: '',
      successMessage: '',
    };
  }

  _setValue = (value: string, hasError: boolean, name: string) => {
    const { formValidate } = this.state;

    this.setState<never>({ [name]: value, formValidate: { ...formValidate, [name]: !hasError } }, this._validateForm);
  };

  _validateForm = () => {
    const { formValidate, password, passwordRecovery } = this.state;
    let hasError = false;
    let errorMsg = '';

    Object.keys(formValidate).forEach(item => {
      if (!formValidate[item]) {
        hasError = true;
      }
    });
    if (!hasError && password !== passwordRecovery) {
      hasError = true;
      errorMsg = 'Пароли не совпадают';
    }
    this.setState({ hasError, error: errorMsg });
  };

  _onResetPassword = () => {
    const { password } = this.state;
    const { search } = this.props.location;
    const param = qs.parse(search.slice(1));

    this.setState({ disabled: true });

    resetPasswordConfirm({ ConfirmationId: param ? param.ConfirmationId : '', Password: password })
      .then(res => {
        if (res && res.Error) {
          throw Error(res.Error);
        }
        if (res) {
          this.setState({
            disabled: false,
            successMessage: (
              <span>
                Пароль успешно изменен. Теперь Вы можете <Link to="/login">войти</Link>, используя новый пароль.
              </span>
            ),
          });
        } else {
          throw Error(res);
        }
      })
      .catch(err => {
        const { response = {}, Message = '', message = '' } = err;
        const { data = {} } = response;

        window.console.log(err);
        this.setState({ error: data.Message || Message || message || 'Что-то пошло не так', disabled: false });
      });
  };

  _onLoginEnter = (e: any) => {
    if (e.key === 'Enter') {
      this._onResetPassword();
    }
  };

  _handlerHidePass = () => {
    const { hidePass } = this.state;

    this.setState({ hidePass: !hidePass });
  };

  render() {
    const { disabled, password, passwordRecovery, hasError, error, hidePass, successMessage } = this.state;

    return (
      <ResetWrapper className="esp__cabinet__reset__container">
        <Title className="esp__cabinet__reset__title">Восстановление пароля</Title>
        {successMessage ? (
          <SuccessWrapper className="esp__cabinet__reset__success">
            <p>{successMessage}</p>
          </SuccessWrapper>
        ) : (
          <LoginForm className="esp__cabinet__reset__form">
            <LoginLine className="esp__cabinet__reset__form__line">
              <Loginlabel className="esp__cabinet__reset__form__label">Пароль</Loginlabel>
              <Input
                className="esp__cabinet__reset__form__input"
                width={'100%'}
                placeholder="Введите новый пароль"
                required={true}
                value={password}
                name="password"
                maxLength={254}
                validKey="passwordHard"
                type={hidePass ? 'password' : 'text'}
                onChange={this._setValue}
              />
            </LoginLine>
            <LoginLine className="esp__cabinet__reset__form__line">
              <Loginlabel className="esp__cabinet__reset__form__label">Подтверждение пароля</Loginlabel>
              <Input
                className="esp__cabinet__reset__form__input"
                width={'100%'}
                type={hidePass ? 'password' : 'text'}
                placeholder="Повторно введите новый пароль"
                required={true}
                value={passwordRecovery}
                maxLength={255}
                name="passwordRecovery"
                onChange={this._setValue}
                onKeyPress={this._onLoginEnter}
              />
            </LoginLine>
            {error ? <ErrorText className="esp__cabinet__reset__error">{error}</ErrorText> : null}
            <CheckboxWrapper className="esp__cabinet__reset__checkbox-container">
              <Checkbox
                className="esp__cabinet__reset__checkbox"
                onChange={this._handlerHidePass}
                checked={hidePass}
                label={'Скрывать вводимые символы'}
              />
            </CheckboxWrapper>
            <LoginLine
              className="esp__cabinet__reset__form__line esp__cabinet__reset__form__line_bottom"
              styleType={'button'}
            >
              <Button
                className="esp__cabinet__reset__form__btn"
                onKeyPress={this._onLoginEnter}
                onClick={this._onResetPassword}
                width={'100%'}
                disabled={disabled || hasError}
              >
                Изменить
              </Button>
            </LoginLine>
          </LoginForm>
        )}
      </ResetWrapper>
    );
  }
}

export default ResetPage;
