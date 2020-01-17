import { h, Component, createRef } from 'preact';
import Button from './../../../components/_common/Button';
import Input from './../../../components/_common/Input';
import Autocomplete from './../../../components/_common/Autocomplete';
import CertModal from './../../../components/CertModal';
import {
  LoginContainer,
  LoginLine,
  LoginForm,
  Loginlabel,
  TemplateOrgName,
  TemplateInfo,
  ErrorText,
  InputContainer,
} from './Wrappers';
import { createAccount, sendConfirmationCode, confirmEmail, getOrganizations } from '../../services';
import { EmailTextWrapper, LinkWrapper, InputWrapper } from './../../../TARIFFS/components/FirstData/Wrappers';
import Link from './../../../components/_common/Link';
import TimerComponent from './TimerComponent';

interface IProps {
  onLogIn: Function;
}
interface IState {
  thumb?: string;
  email: string;
  inn: string;
  search: any;
  code: string;
  disabled: boolean;
  validateForm: IValidateForm;
  hasError: boolean;
  emailConfirmed: boolean;
  confirmId: string;
  errorMsg: string;
}

interface IValidateForm {
  email: boolean;
}

class RegistrationComponent extends Component<IProps, IState> {
  public _timer: any;
  public _timerRef: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      thumb: null,
      inn: '',
      email: '',
      search: '',
      code: '',
      disabled: false,
      validateForm: {
        email: false,
      },
      hasError: true,
      emailConfirmed: false,
      confirmId: null,
      errorMsg: '',
    };
    this._timer = null;
    this._timerRef = createRef();
  }

  componentDidUpdate(_prevProps: IProps, prevState: IState) {
    const { code } = this.state;

    if (prevState.code !== code && code.length === 4) {
      this._handlerConfirmEmailClick();
    }
  }

  _setValue = (value: string, hasError: boolean, name: string) => {
    this.setState(
      state => ({ ...state, [name]: value, validateForm: { ...state.validateForm, [name]: !hasError } }),
      this._validateForm,
    );
  };

  _setDisabled = (disabled: boolean) => {
    this.setState({ disabled });
  };

  _handlerAutoCompleteChange = (value: any) => {
    const { inn = '' } = value || {};

    this.setState({ search: value, inn, thumb: null });
  };

  _validateForm = () => {
    const { validateForm } = this.state;
    let hasError = false;

    Object.keys(validateForm).forEach(item => {
      if (!validateForm[item]) {
        hasError = true;
      }
    });
    this.setState({ hasError });
  };

  async _handlerGetOrganization(term: string) {
    if (!term) {
      return Promise.resolve({});
    }

    return await getOrganizations(term);
  }

  _onRegistration = async () => {
    try {
      const { email, inn, search = {}, thumb } = this.state;
      const { onLogIn } = this.props;
      const { kpp = '' } = search;

      const result = await createAccount({ email, inn, kpp, thumbprint: thumb });
      const { AbonentInfo = {}, Error: error } = result;

      if (error) {
        throw Error(error);
      }

      onLogIn(true, AbonentInfo);
    } catch (error) {
      const { message = '' } = error || {};

      this.setState({ errorMsg: message });
    }
  };

  _handlerSendConfirmationCodeClick = async () => {
    try {
      const { email } = this.state;

      const data = await sendConfirmationCode(email);

      if (data && typeof data === 'object' && 'error' in data) {
        if (data.error === 'Пользователь с таким email уже существует') {
          this.setState({ emailConfirmed: true });
        } else {
          window.console.log(data.error);
        }
      } else {
        this.setState({ confirmId: data });
      }
      const { current = null } = this._timerRef || {};

      current && current.timerStart();
    } catch (e) {
      window.console.log(e);
    }
  };

  _handlerConfirmEmailClick = async () => {
    try {
      const { email, confirmId, code } = this.state;

      const data = await confirmEmail(email, confirmId, code);

      this.setState({ emailConfirmed: data === true });
    } catch (e) {
      window.console.log(e);
    }
  };

  _handleChangeEmail = () => {
    this.setState({ confirmId: null, emailConfirmed: false, errorMsg: '' });
  };

  selectCert(cert: any) {
    this._handlerSelectCert(cert);
  }

  _handlerSelectCert = async (cert: any) => {
    const { inn } = cert;

    try {
      this._setDisabled(true);

      const result = await this._handlerGetOrganization(inn);

      if (result) {
        this.setState({ search: result[0], thumb: cert.thumb });
      }

      this._setDisabled(false);
    } catch (error) {
      window.console.error('error', error);
    }
  };

  _autoCompleteTemplate(item: any) {
    const { shortName = '', fullName = '', inn = '', kpp = '' } = item || {};

    return (
      <p>
        <TemplateOrgName title={fullName}>{shortName || fullName}</TemplateOrgName>
        <TemplateInfo>{`ИНН: ${inn} ${kpp ? `КПП: ${kpp}` : ''}`}</TemplateInfo>
      </p>
    );
  }

  render() {
    const { email, search, disabled, hasError, validateForm, emailConfirmed, confirmId, code, errorMsg } = this.state;
    const { email: emailIsNotValid } = validateForm;

    return (
      <LoginContainer className="esp__auth__form__container">
        <LoginForm className="esp__auth__form">
          <LoginLine className="esp__auth__form__line">
            Укажите организацию или выберите{' '}
            <CertModal disabled={disabled} onSelect={this._handlerSelectCert} trigger={'сертификат'}></CertModal>
          </LoginLine>
          <LoginLine className="esp__auth__form__line">
            <Autocomplete
              service={this._handlerGetOrganization}
              optionValue={'id'}
              alternativeOptionText={'fullName'}
              optionText={'shortName'}
              freeText={true}
              optionTemplate={this._autoCompleteTemplate}
              optionCaption="Введите ИНН, КПП, наименование организации"
              value={search}
              width={'100%'}
              disabled={disabled}
              onChange={this._handlerAutoCompleteChange}
            />
          </LoginLine>
          <LoginLine className="esp__auth__form__line">
            {emailConfirmed ? (
              <p>
                <span
                  id="emailConfirmedId"
                  className="esp__auth__form__text"
                >{`Электронная почта ${email} подтверждена `}</span>
                <LinkWrapper className="esp__auth__form__link">
                  <Link disabled={disabled} onClick={this._handleChangeEmail}>
                    изменить
                  </Link>
                </LinkWrapper>
              </p>
            ) : confirmId ? (
              <div style={{ width: '100%' }}>
                <p style={{ margin: '10px 0' }}>
                  <span
                    id="emailCodeId"
                    className="esp__auth__form__text"
                  >{`Код подтверждения отправлен на ${email} `}</span>
                  <LinkWrapper className="esp__auth__form__link">
                    <Link disabled={disabled} onClick={this._handleChangeEmail}>
                      изменить
                    </Link>
                  </LinkWrapper>
                </p>

                <InputWrapper className="esp__auth__form__code">
                  <Input
                    value={code}
                    width={'120px'}
                    maxLength={4}
                    name="code"
                    disabled={disabled}
                    optionCaption="Код"
                    onChange={this._setValue}
                    className="esp__auth__form__code_input"
                  />
                  <TimerComponent ref={this._timerRef} onSendAgain={this._handlerSendConfirmationCodeClick} />
                </InputWrapper>
              </div>
            ) : (
              <div>
                <Loginlabel className="esp__auth__form__label">Электронная почта</Loginlabel>
                <InputContainer className="esp__auth__form__input_container">
                  <Input
                    placeholder="Введите почту"
                    value={email}
                    name="email"
                    maxLength={254}
                    validKey="email"
                    required={true}
                    disabled={!search || disabled}
                    width={'100%'}
                    onChange={this._setValue}
                    className="esp__auth__form__input"
                  />
                </InputContainer>
              </div>
            )}
          </LoginLine>

          {!emailConfirmed && emailIsNotValid ? (
            <EmailTextWrapper className="esp__auth__form__email-text" style={{ marginBottom: 5 }}>
              <span>
                Электронная почта не подтверждена.{' '}
                <LinkWrapper className="esp__auth__form__link">
                  <Link
                    disabled={!email || !emailIsNotValid || disabled}
                    onClick={this._handlerSendConfirmationCodeClick}
                  >
                    Подтвердить
                  </Link>
                </LinkWrapper>
              </span>
            </EmailTextWrapper>
          ) : null}
          {errorMsg ? <ErrorText className="esp__auth__form__error">{errorMsg}</ErrorText> : null}
          <LoginLine className="esp__auth__form__line esp__auth__form__line_bottom" styleType={'button'}>
            <Button
              className="esp__auth__form__btn esp__auth__form__btn_registration"
              onClick={this._onRegistration}
              disabled={disabled || hasError || !emailConfirmed}
              width={'100%'}
            >
              Зарегистрироваться
            </Button>
          </LoginLine>
        </LoginForm>
      </LoginContainer>
    );
  }
}

export default RegistrationComponent;
