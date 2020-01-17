import { h, Component, createRef } from 'preact';
import Input from './../../../components/_common/Input';
import Button from './../../../components/_common/Button';
import Autocomplete from './../../../components/_common/Autocomplete';
import StepPanel from './../FirstData/StepPanel';
import { FieldsWrapper, InputWrapper as InpWrapper, FieldLabel } from './../FirstData/Wrappers';
import YandexMap from './../../../components/YandexMap';
import ListOffices from './components/ListOffices';
import TariffCard from '../TariffCard';
import Select from './../../../components/_common/Select';
import Spoiler from './../../../components/_common/Spoiler';
import { ISettings, ITarif } from './../TariffList/Interfaces';
import ListSettings from './components/ListSettings';
import Link from './../../../components/_common/Link';
import { IAgent } from './Interfaces';
import { sendRequest, getRequestModel } from './../../components/SendRequest';
import { generatePdfLink, getAgents, getAddress } from './../../services';
import CryptoPlugin from './../../../helpers/CryptoApi';
import {
  RowWrapper,
  FieldListWrapper,
  FieldWrapper,
  Label,
  RightDataWrapper,
  LeftDataWrapper,
  InputLabelWrapper,
  TabsWrapper,
  SpoilerWrapper,
  SettingsWrapper,
  OfficeErrorWrapper,
  LinkRequestWrapper,
  LinkDownloadWrapper,
  LinkLabelWrapper,
  ErrorTemplateWrapper,
  ErrorContentWrapper,
  InnKppWrapper,
  MainContainerWrapper,
  SubContainerWrapper,
  InfoUserWrapper,
  TariffInfoWrapper,
  InputWrapper,
  ServiceWrapper,
  AgreementInfoWrapper,
  TotalPriceWrapper,
  OfficeWrapper,
} from './Wrapper';

import { regions } from './_helper';
import Cookie from '../../../helpers/CookieUtil';
import { Consumer } from './../../context';
import { TYPE } from './../../../constants';

interface IProps {
  type: number;
  utm?: any;
  comment: string;
  regionCode: number;
  productType: number;
  contactPhone?: string;
  contactMiddleName?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  certMiddleName?: string;
  certFirstName?: string;
  certLastName?: string;
  tariff: ITarif;
  organizationName: string;
  inn: string;
  kpp?: string;
  cert?: any;
  changeStep: (step: number, data?: object) => void;
  post?: string;
  legalAddress?: any;
  snils?: string;
  ogrn?: string;
  needItems?: string[];
  inProccess: boolean;
  onChange?: (state: any) => void;
}

interface IState {
  regionCode: number;
  contactPhone: string;
  contactMiddleName: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  checkedOfficeId: any;
  validateForm?: any;
  checkedSettingIds: string[];
  certMiddleName?: string;
  certFirstName?: string;
  certLastName?: string;
  snils?: string;
  spoilers: any;
  hasOfficeError: boolean;
  isWaitDownload: boolean;
  error: string;
  certificateBodyInBase64?: string;
  legalAddress?: any;
  agents?: IAgent[];
  disabled: boolean;
  followingRefLink: boolean;
  requestId?: string;
  yandexMapAgents?: IAgent[];
}

const formatNumber = (num: any) => {
  const strArr = num.toString().split('');
  const arr = [];

  while (strArr.length) {
    arr.unshift(strArr.splice(-3, 3).join(''));
  }

  return arr.join(' ');
};

class SecondData extends Component<IProps, IState> {
  validationsFields: any = {};
  spoilerRefs: any = {
    cert: createRef(),
    office: createRef(),
    contact: createRef(),
    address: createRef(),
    recSetting: createRef(),
    setting: createRef(),
  };
  errorRef: any = createRef();

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const newState = { ...state };

    [
      'contactEmail',
      'contactLastName',
      'contactFirstName',
      'contactMiddleName',
      'contactPhone',
      'certLastName',
      'certFirstName',
      'certMiddleName',
      'cert',
      'needItems',
    ].forEach(key => {
      if (props[key] && state[key] !== props[key]) {
        newState[key] = props[key];
      }
    });

    return { ...newState };
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      regionCode: props.regionCode || 0,
      checkedOfficeId: null,
      contactEmail: props.contactEmail || null,
      contactLastName: props.contactLastName || null,
      contactFirstName: props.contactFirstName || null,
      contactMiddleName: props.contactMiddleName || null,
      contactPhone: props.contactPhone || null,
      checkedSettingIds: [],
      certLastName: props.certLastName || null,
      certFirstName: props.certFirstName || null,
      certMiddleName: props.certMiddleName || null,
      snils: props.cert ? props.cert.snils : null,
      hasOfficeError: false,
      legalAddress: props.legalAddress,
      spoilers: {
        cert: true,
        office: false,
        contact: false,
        recSetting: false,
        address: false,
        setting: false,
      },
      isWaitDownload: false,
      error: '',
      certificateBodyInBase64: null,
      agents: [],
      yandexMapAgents: [],
      disabled: false,
      followingRefLink: false,
    };

    this._setValidFields();
  }

  componentDidMount() {
    const widget = document.getElementsByClassName('esp__tariffs')[0];
    const ai = Cookie.getCookie('taxcom_agent');

    if (ai) {
      this.setState({ checkedOfficeId: ai, followingRefLink: true });
    }
    widget.scrollIntoView({ behavior: 'smooth' });

    this._cryproInit();
    this._getAgents();
  }

  componentDidUpdate() {
    const { error } = this.state;

    if (error) {
      this.errorRef.current.base.scrollIntoView({ behavior: 'smooth' });
    }
  }

  _setValidFields() {
    const { needItems, type } = this.props;

    needItems &&
      needItems.forEach(item => {
        switch (item) {
          case 'LastName':
            this.validationsFields.lastName = { ref: createRef(), spoiler: 'cert' };
            break;
          case 'FirstName':
            this.validationsFields.firstName = { ref: createRef(), spoiler: 'cert' };
            break;
          case 'ContactPersonFullName':
            this.validationsFields.contactLastName = { ref: createRef(), spoiler: 'contact' };
            this.validationsFields.contactFirstName = { ref: createRef(), spoiler: 'contact' };
            break;
          case 'ContactPersonEmail':
            this.validationsFields.contactEmail = { ref: createRef(), spoiler: 'contact' };
            break;
          case 'SNILS':
            if (type !== TYPE.EDO) {
              this.validationsFields.snils = { ref: createRef(), spoiler: 'cert' };
            }
            break;
          case 'LegalAddressFiasId':
            this.validationsFields.legalAddress = { ref: createRef(), spoiler: 'address' };
            break;
        }
      });
  }

  _getAgents = async () => {
    const { regionCode } = this.state;
    const { productType } = this.props;

    try {
      const data = await getAgents(regionCode, productType, 0);
      const yandexMap = data.filter(
        (item: any) =>
          item.coordinates.length > 1 && !isNaN(Number(item.coordinates[0])) && !isNaN(Number(item.coordinates[1])),
      );

      this.setState({ agents: data, yandexMapAgents: yandexMap });
    } catch (error) {
      this.setState({ error: error.message || 'Произошла непредвиденная ошибка' });
    }
  };

  _cryproInit = () => {
    const { cert } = this.props;
    const cryptoPlugin = new CryptoPlugin();

    if (!cert) {
      return;
    }

    cryptoPlugin.getCertificateFromStore(cert.thumb, 'MY', (error: any, data: any) => {
      if (error) {
        this.setState({ error: 'Произошла ошибка при получении тела сертификата' });
        return null;
      }

      this.setState({ certificateBodyInBase64: data['cert_content_B64'] });
    });
  };

  _spoilerToggle = (name: string) => {
    const { spoilers } = this.state;
    const { [name]: isOpen } = spoilers;

    const closeSpoilers = {};

    Object.keys(spoilers).forEach(key => (closeSpoilers[key] = false));

    this._resetErrorMsg();
    this.setState({
      spoilers: {
        ...closeSpoilers,
        [name]: isOpen ? isOpen : !isOpen,
      },
    });
  };

  _spoilerOpenAll = () => {
    const { spoilers } = this.state;

    const newState = {
      ...spoilers,
    };

    for (const key in newState) {
      if (key in newState) {
        newState[key] = true;
      }
    }

    this.setState({
      spoilers: {
        ...newState,
      },
    });
  };

  _spoilerOpenByName(name: string, scroll: boolean) {
    this.setState(
      state => ({ spoilers: { ...state.spoilers, [name]: true } }),
      () => {
        const { current: { base = null } = {} } = this.spoilerRefs[name] || {};

        scroll && base && base.scrollIntoView({ behavior: 'smooth' });
      },
    );
  }

  _mapAddressesToList = (list: any[]) => {
    const { checkedOfficeId } = this.state;

    return list.map(i => {
      return {
        id: i.code.ai1,
        label: i.name,
        phone: i.beautifulPhone,
        hint: i.name,
        description: `${i.address}`,
        coordinates: i.coordinates.map((item: any) => parseFloat(item)),
        checked: i.code.ai1 === checkedOfficeId,
      };
    });
  };

  _validateAll = () => {
    const { checkedOfficeId } = this.state;
    let hasError = false;

    for (const key in this.validationsFields) {
      if (key in this.validationsFields) {
        const error = this.validationsFields[key].ref.current.validate();

        if (error) {
          this._spoilerOpenByName(this.validationsFields[key].spoiler, !hasError);
          hasError = true;
        }
      }
    }

    if (!checkedOfficeId) {
      hasError = true;
      this.setState({ hasOfficeError: true }, () => {
        this._spoilerOpenByName('office', true);
      });
    }

    return hasError;
  };

  _mapRecommendedSettings = (settings: ISettings[]): ISettings[] => {
    return settings.filter(item => item.atExtraCost === true);
  };

  _getPersonFullName = (surname: string, name: string, lastname?: string): string => {
    return `${surname} ${name}${lastname ? ` ${lastname}` : ''}`;
  };

  _getAgent = () => {
    const { checkedOfficeId, agents } = this.state;

    const item = agents.find(r => r.code.ai1 === checkedOfficeId);

    if (!item) {
      return null;
    }

    const { name, code, inn, region, address, phone, order, beautifulPhone } = item;

    return {
      Name: name,
      Code: {
        AI1: code.ai1,
        AI2: code.ai2,
        AI3: code.ai3,
        AI4: code.ai4,
      },
      Inn: inn,
      Region: region,
      Address: address,
      Phone: phone,
      Order: order,
      BeautifulPhone: beautifulPhone,
    };
  };

  _resetErrorMsg() {
    this.setState({ error: '' });
  }

  _handlerOfficeCheck = (id: any) => {
    this.setState({ checkedOfficeId: id, hasOfficeError: !id }, () => {
      this._resetErrorMsg();
    });
  };

  _handlerPlacemarkClick = (obj: any) => {
    this._resetErrorMsg();
    this._handlerOfficeCheck(obj.id);
  };

  _handlerValueChange = (value: any, _error: boolean, attr: any) => {
    this.setState({ [attr]: value } as IState, () => {
      this._resetErrorMsg();
    });
  };

  _handlerNext = () => {
    const hasError = this._validateAll();

    !hasError && this._sendRequest();
  };

  _getRequestModel() {
    const agent = this._getAgent();
    const { inn, kpp, organizationName, post, ogrn, utm, comment, tariff } = this.props;

    return { ...this.state, inn, kpp, organizationName, post, ogrn, utm, comment, tariff, agent };
  }

  _sendRequest = async () => {
    const { changeStep, type } = this.props;

    this.setState({ disabled: true });

    try {
      const modelData = this._getRequestModel();
      const data: any = await sendRequest(modelData, type);

      const { error, redirectUrl, requestId } = data;

      if (error) {
        this.setState({
          error: error || 'Произошла непредвиденная ошибка',
          disabled: false,
          requestId,
        });
        return;
      }

      changeStep(4, { redirectUrl });
    } catch (error) {
      this.setState({ error: error.message || 'Произошла непредвиденная ошибка', disabled: false });
    }
  };

  _handlerSettingCheck = (checkedId: string): void => {
    const { checkedSettingIds } = this.state;
    const itemIndex = checkedSettingIds.findIndex(item => item === checkedId);

    this._resetErrorMsg();

    if (~itemIndex) {
      const array = checkedSettingIds;

      array.splice(itemIndex, 1);
      this.setState({ checkedSettingIds: array });
    } else {
      this.setState(prevState => ({
        checkedSettingIds: [...prevState.checkedSettingIds, checkedId],
      }));
    }
  };

  _handlerChangeRegion = (regionCode: any) => {
    this.setState({ regionCode }, this._getAgents);
  };

  _handlerAutoCompleteChange = (value: any) => {
    this._handlerValueChange(value, false, 'legalAddress');
  };

  _handlerDownloadRequest = async () => {
    this.setState({ isWaitDownload: true, error: '' });

    try {
      const modelData = this._getRequestModel();
      const requestData = getRequestModel(modelData);
      const data = await generatePdfLink(requestData);

      const linkSource = `data:application/pdf;base64,${data.pdf}`;
      const downloadLink = document.createElement('a');
      const fileName = 'taxcom_request.pdf';

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      console.error('error', error);
    } finally {
      this.setState({ isWaitDownload: false });
    }
  };

  _handlerAddressValid = (value: any) => {
    let error: any;

    if (Object.keys(value).length === 0) {
      error = { message: 'Выберите адрес из списка' };
    }

    return error;
  };

  _handlePromoCode = (value: string) => {
    const { onChange } = this.props;

    onChange({ ...this.state, comment: value });
  };

  async _handlerGetAddress(term: string) {
    if (!term) {
      return Promise.resolve({});
    }

    return await getAddress({ term });
  }

  _renderRecommendedSettings = () => {
    const { checkedSettingIds } = this.state;
    const recommendedSettings = this._getRecomendedSettings();

    if (recommendedSettings.length) {
      return (
        <SettingsWrapper>
          <ListSettings
            list={recommendedSettings}
            onCheck={this._handlerSettingCheck}
            checkedIds={checkedSettingIds}
          ></ListSettings>
        </SettingsWrapper>
      );
    }

    return null;
  };

  _getRecomendedSettings() {
    const { tariff } = this.props;
    const { settings = [] } = tariff || {};

    return this._mapRecommendedSettings(settings);
  }

  _getValidRefByName(name: string) {
    const validField = this.validationsFields[name];

    return validField ? validField.ref : null;
  }

  _renderAddressItemTemplate(item: any) {
    return <p>{item.displayText}</p>;
  }

  render() {
    const { tariff, organizationName, inn, kpp, cert, changeStep, inProccess, comment, type } = this.props;

    const {
      contactEmail,
      contactFirstName,
      contactLastName,
      contactMiddleName,
      contactPhone,
      certFirstName,
      certLastName,
      certMiddleName,
      snils,
      spoilers,
      hasOfficeError,
      isWaitDownload,
      error,
      agents,
      yandexMapAgents,
      legalAddress,
      requestId,
      followingRefLink,
    } = this.state;

    const {
      cert: certIsOpen,
      office: officeIsOpen,
      setting: settingIsOpen,
      contact: contactIsOpen,
      address: addressIsOpen,
    } = spoilers;

    const {
      name = '',
      sale = 0,
      basePrice = 0,
      rangePrice = 0,
      price = 0,
      paymentPeriod = null,
      priceTitle = '',
      exchangeDirections = [],
    } = tariff || {};

    const { checkedOfficeId, regionCode, disabled } = this.state;
    const officeMapList = this._mapAddressesToList(yandexMapAgents);
    const officeList = this._mapAddressesToList(agents);
    const textButton = cert && cert.inn ? 'Подписать и отправить' : 'Отправить заявку';
    const agent = this._getAgent();
    const recommendedSettings = this._getRecomendedSettings();

    return (
      <div>
        <StepPanel currentStep={2} changeStep={changeStep} />

        {error ? (
          <ErrorTemplateWrapper className="esp__tariffs__error-template-wrapper" ref={this.errorRef}>
            <ErrorContentWrapper className="esp__tariffs__error-content">
              {error}{' '}
              {requestId ? (
                <span>
                  (<Link href={`/account/#/requests/${requestId}`}>перейти в заявку</Link>)
                </span>
              ) : null}
            </ErrorContentWrapper>
          </ErrorTemplateWrapper>
        ) : null}

        <MainContainerWrapper className="esp__tariffs__request">
          <InfoUserWrapper className="esp__tariffs__request__info-user">
            <LeftDataWrapper className="esp__tariffs__request__left-data">
              <RowWrapper className="esp__tariffs__request__row">
                <Label>{organizationName}</Label>
              </RowWrapper>
              <RowWrapper className="esp__tariffs__request__row">
                <InnKppWrapper>{`ИНН ${inn}${kpp ? ` / КПП ${kpp}` : ''}`}</InnKppWrapper>
              </RowWrapper>

              <SpoilerWrapper className="esp__tariffs__request__spoiler" ref={this.spoilerRefs.cert}>
                <Spoiler label="Владелец сертификата" isOpen={certIsOpen} onClick={() => this._spoilerToggle('cert')}>
                  <RowWrapper className="esp__tariffs__request__row">
                    <FieldListWrapper className="esp__tariffs__request__field-list">
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Фамилия</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            required={'lastName' in this.validationsFields}
                            value={certLastName}
                            name="certLastName"
                            onChange={this._handlerValueChange}
                            ref={this._getValidRefByName('lastName')}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Имя</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            required={'firstName' in this.validationsFields}
                            value={certFirstName}
                            name="certFirstName"
                            onChange={this._handlerValueChange}
                            ref={this._getValidRefByName('firstName')}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Отчество</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            value={certMiddleName}
                            name="certMiddleName"
                            onChange={this._handlerValueChange}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      {'snils' in this.validationsFields ? (
                        <FieldWrapper className="esp__tariffs__request__field">
                          <InputLabelWrapper className="esp__tariffs__request__input-label">СНИЛС</InputLabelWrapper>
                          <InputWrapper className="esp__tariffs__request__input">
                            <Input
                              disabled={disabled || inProccess}
                              mask={'000 000 000 00'}
                              unmask={true}
                              width={300}
                              required={'snils' in this.validationsFields}
                              value={snils}
                              validKey={'snils'}
                              name="snils"
                              onChange={this._handlerValueChange}
                              ref={this._getValidRefByName('snils')}
                            />
                          </InputWrapper>
                        </FieldWrapper>
                      ) : null}
                    </FieldListWrapper>
                  </RowWrapper>
                </Spoiler>
              </SpoilerWrapper>

              {'legalAddress' in this.validationsFields ? (
                <SpoilerWrapper className="esp__tariffs__request__spoiler" ref={this.spoilerRefs.address}>
                  <Spoiler label="Адрес" isOpen={addressIsOpen} onClick={() => this._spoilerToggle('address')}>
                    <RowWrapper className="esp__tariffs__request__row">
                      <FieldListWrapper className="esp__tariffs__request__field-list">
                        <FieldWrapper className="esp__tariffs__request__field">
                          <InputLabelWrapper className="esp__tariffs__request__input-label">
                            Фактический адрес
                          </InputLabelWrapper>
                          <Autocomplete
                            disabled={disabled || inProccess}
                            service={this._handlerGetAddress}
                            optionValue={'fiasAddressId'}
                            optionText={'displayText'}
                            freeText={false}
                            optionTemplate={this._renderAddressItemTemplate}
                            optionCaption="Введите адрес"
                            onValidate={this._handlerAddressValid}
                            value={legalAddress}
                            width={300}
                            onChange={this._handlerAutoCompleteChange}
                            ref={this._getValidRefByName('legalAddress')}
                          />
                        </FieldWrapper>
                      </FieldListWrapper>
                    </RowWrapper>
                  </Spoiler>
                </SpoilerWrapper>
              ) : null}

              <SpoilerWrapper className="esp__tariffs__request__spoiler" ref={this.spoilerRefs.contacts}>
                <Spoiler label="Контактное лицо" isOpen={contactIsOpen} onClick={() => this._spoilerToggle('contact')}>
                  <RowWrapper className="esp__tariffs__request__row">
                    <FieldListWrapper className="esp__tariffs__request__field-list">
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Фамилия</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            required={'contactLastName' in this.validationsFields}
                            value={contactLastName}
                            name="contactLastName"
                            onChange={this._handlerValueChange}
                            ref={this._getValidRefByName('contactLastName')}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Имя</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            required={'contactFirstName' in this.validationsFields}
                            value={contactFirstName}
                            name="contactFirstName"
                            onChange={this._handlerValueChange}
                            ref={this._getValidRefByName('contactFirstName')}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Отчество</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            value={contactMiddleName}
                            name="contactMiddleName"
                            onChange={this._handlerValueChange}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">E-mail</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            value={contactEmail}
                            name="contactEmail"
                            validKey={'email'}
                            required={'contactEmail' in this.validationsFields}
                            onChange={this._handlerValueChange}
                            ref={this._getValidRefByName('contactEmail')}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                      <FieldWrapper className="esp__tariffs__request__field">
                        <InputLabelWrapper className="esp__tariffs__request__input-label">Телефон</InputLabelWrapper>
                        <InputWrapper className="esp__tariffs__request__input">
                          <Input
                            disabled={disabled || inProccess}
                            width={300}
                            mask={'+7 (000) 000-00-00'}
                            unmask={true}
                            value={contactPhone}
                            name="contactPhone"
                            onChange={this._handlerValueChange}
                          />
                        </InputWrapper>
                      </FieldWrapper>
                    </FieldListWrapper>
                  </RowWrapper>
                </Spoiler>
              </SpoilerWrapper>

              {!followingRefLink ? (
                <SpoilerWrapper className="esp__tariffs__request__spoiler" ref={this.spoilerRefs.office}>
                  <Spoiler
                    label="Выберите офис обслуживания"
                    isOpen={officeIsOpen}
                    onClick={() => this._spoilerToggle('office')}
                  >
                    <OfficeErrorWrapper className="esp__tariffs__request__office-error">
                      {hasOfficeError ? 'Офис обслуживания не выбран' : '\u00A0'}
                    </OfficeErrorWrapper>
                    <TabsWrapper className="esp__tariffs__request__tabs">
                      <Select
                        options={regions}
                        optionValue={'value'}
                        onChange={this._handlerChangeRegion}
                        optionText={'label'}
                        value={regionCode}
                      />{' '}
                    </TabsWrapper>
                    <OfficeWrapper>
                      <ListOffices
                        disabled={disabled || inProccess}
                        list={officeList}
                        onCheck={this._handlerOfficeCheck}
                        checkedId={checkedOfficeId}
                      />
                      <YandexMap list={officeMapList} onPlacemarkClick={this._handlerPlacemarkClick} />
                    </OfficeWrapper>
                  </Spoiler>
                </SpoilerWrapper>
              ) : null}

              {recommendedSettings.length > 0 ? (
                <SpoilerWrapper className="esp__tariffs__request__spoiler" ref={this.spoilerRefs.recSetting}>
                  <Spoiler
                    label="Выберите дополнительные услуги"
                    isOpen={settingIsOpen}
                    onClick={() => this._spoilerToggle('setting')}
                  >
                    <ServiceWrapper alone={true}>{this._renderRecommendedSettings()}</ServiceWrapper>
                  </Spoiler>
                </SpoilerWrapper>
              ) : null}
            </LeftDataWrapper>
          </InfoUserWrapper>
          <TariffInfoWrapper className="esp__tariffs__request__tariff-info">
            <RightDataWrapper className="esp__tariffs__request__right-data">
              <RowWrapper className="esp__tariffs__request__row">
                {tariff ? (
                  <Consumer>
                    {context => (
                      <TariffCard
                        type={context.type}
                        alone={true}
                        name={name}
                        sale={sale}
                        rangePrice={rangePrice}
                        basePrice={basePrice}
                        price={price}
                        paymentPeriod={paymentPeriod}
                        priceTitle={priceTitle}
                        exchangeDirections={exchangeDirections}
                        isRecommended={false}
                      />
                    )}
                  </Consumer>
                ) : null}
                <FieldsWrapper className="esp__tariffs__organization__promo">
                  <FieldLabel className="esp__tariffs__first-form__field-label">Промокод</FieldLabel>
                  <InpWrapper className="esp__tariffs__first-form__code-wpapper">
                    <Input value={comment} width={'100%'} name="comment" onChange={this._handlePromoCode} />
                  </InpWrapper>
                </FieldsWrapper>
              </RowWrapper>
              <TotalPriceWrapper className="esp__tariffs__request__total-price">
                Итоговая стоимость: {formatNumber(price)}
              </TotalPriceWrapper>
              <RowWrapper className="esp__tariffs__request__row">
                <Button
                  className="esp__tariffs__request__third-step"
                  primary={true}
                  disabled={disabled || inProccess}
                  onClick={this._handlerNext}
                >
                  {textButton}
                </Button>
                {cert && cert.inn && type === TYPE.REPORTS ? (
                  <LinkRequestWrapper className="esp__tariffs__request__link-request">
                    <LinkLabelWrapper className="esp__tariffs__request__link-label">
                      <Link onClick={this._handlerDownloadRequest} disabled={!agent || !contactEmail}>
                        Ознакомиться с заявкой
                      </Link>
                    </LinkLabelWrapper>
                    <LinkDownloadWrapper
                      className="esp__tariffs__request__link-download"
                      disabled={!agent || !contactEmail}
                      wait={isWaitDownload}
                    ></LinkDownloadWrapper>
                  </LinkRequestWrapper>
                ) : null}
              </RowWrapper>
            </RightDataWrapper>
          </TariffInfoWrapper>
        </MainContainerWrapper>
        <SubContainerWrapper className="esp__tariffs__request__sub-container">
          <LeftDataWrapper className="esp__tariffs__request__left-data">
            <AgreementInfoWrapper className="esp__tariffs__request__agreement-info">
              {cert && cert.inn ? (
                <span>
                  Настоящим заявляю о намерении заключить Договор на использовании системы ЭДО в порядке,
                  предусмотренном ст. 426 и ст. 428 Гражданского Кодекса Российской Федерации. Принимаю на себя
                  обязательства следовать положениям Договора, включая условия, изложенные в других документах Системы
                  "Такском-ЭДО", которые мне разъяснены в полном объёме и имеют для меня обязательную силу.
                </span>
              ) : (
                <span>
                  Нажимая кнопку «Продолжить», я выражаю свое согласие с обработкой персональных данных ООО «Такском» в
                  соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных» и{' '}
                  <a href="http://taxcom.ru/upload/documents/policy.pdf" target="_blank">
                    Политикой обработки Персональных данных ООО «Такском».
                  </a>
                </span>
              )}
            </AgreementInfoWrapper>
          </LeftDataWrapper>
        </SubContainerWrapper>
      </div>
    );
  }
}

export default SecondData;
