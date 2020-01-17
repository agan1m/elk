import { h, Component } from 'preact';

import Input from './../../../components/_common/Input';
import Link from './../../../components/_common/Link';
import Button from './../../../components/_common/Button';
import Tooltip from './../../../components/_common/Tooltip';
import Autocomplete from './../../../components/_common/Autocomplete';
import CertModal from './../../../components/CertModal';
import {
  CertModalWrapper,
  ScrollContainer,
  CertTable,
  CertItem,
  CertLeftCell,
} from './../../../components/CertModal/Wrappers';
import EditIcon from './../../../components/Icons/EditIcon';
import {
  FieldsWrapper,
  EmailLine,
  FieldLabel,
  TemplateOrgName,
  TemplateInfo,
  EmailWrapper,
  InputWrapper,
  LinkWrapper,
  TooltipWrapper,
  ControlsWrapper,
} from './Wrappers';
import { getOrganizations, getAccountData } from '../../services';

interface IProps {
  hasAccount: boolean;
  disabled: boolean;
  onSubmit: () => void;
  onChange: (data?: object) => void;
}

interface IState {
  email: string;
  inn: string;
  kpp: string;
  lastName: string;
  firstName: string;
  middleName: string;
  organizationName: string;
  search: any;
  validateForm: IValidateForm;
  needItems: string[];
  cert: any;
  password: string;
  disabled: boolean;
  showKppModal: boolean;
  subsidiaries: [];
}

interface IValidateForm {
  email: boolean;
  password: boolean;
}

class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      inn: '',
      kpp: '',
      lastName: '',
      firstName: '',
      middleName: '',
      organizationName: '',
      search: null,
      validateForm: {
        email: true,
        password: true,
      },
      needItems: [],
      cert: {},
      password: '',
      disabled: false,
      showKppModal: false,
      subsidiaries: [],
    };
  }

  _handleChange = (value: any, hasError: boolean, attr: string) => {
    this.setState(
      state =>
        ({
          [attr]: value && value.trim(),
          validateForm: { ...state.validateForm, [attr]: hasError },
        } as IState),
      this._onChange,
    );
  };

  _onChange(data?: any) {
    const { onChange } = this.props;

    onChange && onChange({ ...this.state, ...data });
  }

  _onSubmit = () => {
    const { onSubmit } = this.props;

    onSubmit && onSubmit();
  };

  _serviceInn = async () => {
    const { inn, cert } = this.state;

    try {
      this.setState({ disabled: true });

      const data = await getAccountData(inn, Object.keys(cert).length > 0);

      this._setOrganizationByData(data);
    } catch (err) {
      window.console.log(err);
    } finally {
      this.setState({ disabled: false });
    }
  };

  _setOrganizationByData(data: any) {
    const { inn, cert, search } = this.state;

    const {
      companyShortName = '',
      firstName = '',
      lastName = '',
      middleName = '',
      subsidiaries = [],
      needItems = [],
      description = '',
    } = data || {};

    if (description) {
      return;
    }

    const kpp =
      subsidiaries && subsidiaries.length === 1
        ? subsidiaries[0].kpp
        : subsidiaries.length === 0
        ? ''
        : [...subsidiaries];

    const isKppList = Array.isArray(kpp);

    const newState = {
      kpp,
      inn,
      lastName,
      firstName,
      middleName,
      organizationName: companyShortName,
      needItems,
      cert,
    };

    this.setState(
      {
        ...newState,
        subsidiaries,
        search: { ...search, shortName: companyShortName, inn: inn, kpp: isKppList ? '' : newState.kpp },
      },
      () => (isKppList ? this._showKppModal() : this._onChange(newState)),
    );
  }

  _showKppModal(showKppModal = true) {
    this.setState({ showKppModal });
  }

  _handlerSelectCert = (cert: any) => {
    const { inn = '', o: shortName = '' } = cert || {};

    const id = Math.floor(Math.random() * (1000 - 1)) + 1;

    this.setState({ search: { shortName, id, inn, cert } });
  };

  _handlerAutoCompleteChange = (value: any) => {
    const { inn = '', cert = {} } = value || {};
    const { hasAccount } = this.props;

    if (inn) {
      this.setState({ search: value, inn, cert }, this._serviceInn);
    } else {
      !hasAccount && this._handleChangeEmail();
      this.setState({ search: value, inn, cert });
    }
  };

  _autoCompleteTemplate(item: any) {
    const { shortName = '', fullName = '', inn = '', kpp = '' } = item || {};

    return (
      <p className="esp__tariffs__first-form__search">
        <TemplateOrgName className="esp__tariffs__first-form__search-org-name" title={fullName}>
          {shortName || fullName}
        </TemplateOrgName>
        <TemplateInfo className="esp__tariffs__first-form__search-info">{`ИНН: ${inn} ${
          kpp ? `КПП: ${kpp}` : ''
        }`}</TemplateInfo>
      </p>
    );
  }

  _handleChangeEmail = () => {
    const { hasAccount } = this.props;
    const { search, email } = this.state;

    this.setState({ email: hasAccount || !search ? '' : email }, this._onChange);
  };

  _handlerOrganizationValid = (value: any) => {
    let error: any;

    if (Object.keys(value).length === 0) {
      error = { message: 'Выберите организацию из списка' };
    }

    return error;
  };

  _handlerSelectKpp = (kpp: string) => {
    const { search } = this.state;

    this.setState({ kpp, search: { ...search, kpp }, showKppModal: false }, () => this._onChange({ kpp }));
  };

  async _handlerGetOrganization(term: string) {
    if (!term) {
      return Promise.resolve({});
    }

    return await getOrganizations(term);
  }

  _autocompleteValueFormatter = ({ shortName = '', inn = '', kpp = '', fullName }) => {
    return shortName ? `${shortName} (ИНН: ${inn}${kpp ? `, КПП ${kpp}` : ''})` : fullName;
  };

  render() {
    const { disabled: propDisabled, hasAccount } = this.props;
    const { email, search, validateForm, password, disabled: stateDisabled, showKppModal, subsidiaries } = this.state;
    const { shortName = '', inn = '', kpp = '' } = search || {};

    const disabled = propDisabled || stateDisabled;

    return (
      <FieldsWrapper className="esp__tariffs__first-form">
        {!hasAccount ? (
          <div className="esp__tariffs__first-form__wrapper">
            <FieldLabel className="esp__tariffs__first-form__field-label">
              Укажите организацию или выберите{' '}
              <CertModal
                disabled={hasAccount || showKppModal}
                onSelect={this._handlerSelectCert}
                trigger="сертификат"
              />
            </FieldLabel>
            <Autocomplete
              disabled={disabled || showKppModal}
              title={shortName ? `${shortName}\nИНН: ${inn}${kpp ? `\nКПП: ${kpp}` : ''}` : null}
              service={this._handlerGetOrganization}
              optionValue={'id'}
              optionText={'shortName'}
              alternativeOptionText={'fullName'}
              optionTemplate={this._autoCompleteTemplate}
              optionCaption="Введите ИНН, наименование организации или ФИО"
              value={hasAccount ? '' : search}
              width={'100%'}
              onValidate={this._handlerOrganizationValid}
              valueTemplate={this._autocompleteValueFormatter}
              onChange={this._handlerAutoCompleteChange}
            />
            {showKppModal ? (
              <CertModalWrapper>
                <ScrollContainer>
                  <CertTable className="esp__cert-modal__list">
                    <tbody>
                      {subsidiaries.map((item: any, index: number) => {
                        return (
                          <CertItem
                            key={index}
                            className="esp__cert-modal__item"
                            onClick={() => this._handlerSelectKpp(item.kpp)}
                          >
                            <CertLeftCell className="esp__cert-modal__left-cell">
                              <span className="esp__cert-modal__org-name" title={item.kpp}>
                                КПП: {item.kpp}
                              </span>
                            </CertLeftCell>
                          </CertItem>
                        );
                      })}
                    </tbody>
                  </CertTable>
                </ScrollContainer>
              </CertModalWrapper>
            ) : null}
          </div>
        ) : null}
        <EmailLine className="esp__tariffs__first-form__email-line">
          {hasAccount ? (
            <div style={{ width: '100%' }}>
              <FieldLabel className="esp__tariffs__first-form__field-label">
                E-mail <Link href={`mailto: ${email}`}>{email}</Link>{' '}
                <LinkWrapper className="esp__tariffs__first-form__link-wpapper">
                  <Link disabled={disabled} onClick={this._handleChangeEmail}>
                    <EditIcon color="#1685CE" width={15} />{' '}
                  </Link>
                </LinkWrapper>
                уже зарегистрирован
              </FieldLabel>
              <FieldLabel className="esp__tariffs__first-form__field-label">
                Введите пароль, чтобы продолжить
              </FieldLabel>
              <InputWrapper className="esp__tariffs__first-form__code-wpapper">
                <Input
                  type="password"
                  disabled={disabled}
                  value={password}
                  validKey="password"
                  width={'100%'}
                  withEye={true}
                  name="password"
                  optionCaption="Пароль"
                  onChange={this._handleChange}
                />
              </InputWrapper>
            </div>
          ) : null}
          {!hasAccount ? (
            <div style={{ width: '100%' }}>
              <FieldLabel className="esp__tariffs__first-form__field-label">Электронная почта</FieldLabel>
              <EmailWrapper>
                <Input
                  value={!search ? '' : email}
                  required={true}
                  width={'100%'}
                  validKey={'email'}
                  disabled={!search || disabled}
                  optionCaption="Введите E-mail"
                  name="email"
                  onChange={this._handleChange}
                />{' '}
              </EmailWrapper>
              <TooltipWrapper>
                <Tooltip
                  isHovered
                  message={
                    'Данный e-mail будет использован в качестве логина при входе в личный кабинет. На него придёт письмо со ссылкой для смены пароля. Также на него будут отправлены документы для оплаты и получения услуг.'
                  }
                />
              </TooltipWrapper>
            </div>
          ) : null}
        </EmailLine>
        <ControlsWrapper hasAccount={hasAccount} className="esp__tariffs__first-form__wrapper">
          {hasAccount ? (
            <Link target="_blank" href={`/account/#/restorepassword?email=${email}`}>
              Забыли&nbsp;пароль?
            </Link>
          ) : null}{' '}
          <Button
            className="esp__tariffs__request__second-step"
            primary={true}
            onClick={this._onSubmit}
            disabled={disabled || (!hasAccount ? !inn : validateForm.password) || validateForm.email}
          >
            Продолжить
          </Button>
        </ControlsWrapper>
      </FieldsWrapper>
    );
  }
}

export default Form;
