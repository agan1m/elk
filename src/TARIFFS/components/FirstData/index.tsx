import { h, Component, createRef } from 'preact';
import Form from './Form';
import ButtonPanel from './ButtonPanel';
import StepPanel from './StepPanel';
import { FormWrapper, TariffsOrganizationWrapper, FieldsWrapper, InputWrapper, FieldLabel } from './Wrappers';
import {
  InfoUserWrapper,
  RightDataWrapper,
  LeftDataWrapper,
  MainContainerWrapper,
  TariffInfoWrapper,
  RowWrapper,
  ErrorTemplateWrapper,
  ErrorContentWrapper,
} from '../SecondData/Wrapper';
import { IProps, IState } from './Interfaces';
import TariffCard from '../TariffCard';
import { createAccount } from '../../services';
import { logIn } from '../../../LOGIN/services';
import CookieUtil from './../../../helpers/CookieUtil';
import { Consumer } from './../../context';
import Input from './../../../components/_common/Input';

class FirstData extends Component<IProps, IState> {
  _formRef: any;
  constructor(props: IProps) {
    super(props);

    this.state = {
      cert: {
        inn: '',
      },
      email: '',
      inn: '',
      kpp: '',
      fio: '',
      lastName: '',
      firstName: '',
      middleName: '',
      organizationName: '',
      code: '',
      confirmId: '',
      error: '',
      password: '',
      hasAccount: false,
      validateForm: {
        email: true,
        password: true,
      },
      inProccess: false,
    };

    this._formRef = createRef();
  }

  componentDidMount() {
    const widget = document.getElementsByClassName('esp__tariffs')[0];

    widget.scrollIntoView({ behavior: 'smooth' });
  }

  _handlerNext = async () => {
    const { changeStep } = this.props;
    const { email, inn, kpp, organizationName, cert } = this.state;

    await this.setState({
      error: '',
      inProccess: true,
    });

    try {
      if (cert.inn) {
        CookieUtil.setCookie('profile', JSON.stringify({ thumb: cert.thumb }));
      }

      const { Error } = await createAccount({ email, inn, kpp: kpp || null });

      if (Error == 'Пользователь с таким email уже существует') {
        this.setState({ hasAccount: true, inProccess: false });
        return;
      }

      changeStep(3, { email, inn, kpp, organizationName, cert: cert && cert.inn === inn ? cert : null });
    } catch (error) {
      this.setState(
        {
          error: error.message,
          inProccess: false,
        },
        () => window.console.error(error),
      );
    }
  };

  _handlerBack = () => {
    const { changeStep, step } = this.props;

    changeStep(step - 1);
  };

  _handlerChange = (state: any) => {
    const { onChange } = this.props;
    const { hasAccount } = this.state;

    this.setState({ ...state, hasAccount: state.email ? hasAccount : false, error: '' }, () => onChange(this.state));
  };

  _handlerLogIn = async () => {
    const { changeStep } = this.props;
    const { email, password, inn, kpp, organizationName, cert } = this.state;

    await this.setState({
      error: '',
      inProccess: true,
    });

    try {
      const res = await logIn({ email, password });

      if (res && typeof res === 'object' && res.Error) {
        throw Error(res.Error);
      }

      changeStep(3, { email, inn, kpp, organizationName, cert: cert && cert.inn === inn ? cert : null });
    } catch (error) {
      const { response = {}, Message = '', message = '' } = error || {};
      const { data = {} } = response;

      this.setState({ error: data.Message || Message || message, inProccess: false });
    }
  };

  _handlerFormSubmit = () => {
    const { hasAccount } = this.state;

    hasAccount ? this._handlerLogIn() : this._handlerNext();
  };

  _handlePromoCode = (value: string) => {
    const { onChange } = this.props;

    onChange({ ...this.state, comment: value });
  };

  render() {
    const { tariff, changeStep, comment } = this.props;
    const { error, inProccess, hasAccount } = this.state;

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

    return (
      <TariffsOrganizationWrapper className="esp__tariffs__organization">
        <StepPanel currentStep={2} changeStep={changeStep} />
        {error ? (
          <ErrorTemplateWrapper className="esp__tariffs__error">
            <ErrorContentWrapper className="esp__tariffs__error-content">{error}</ErrorContentWrapper>
          </ErrorTemplateWrapper>
        ) : null}
        <MainContainerWrapper className="esp__tariffs__organization__main">
          <InfoUserWrapper className="esp__tariffs__organization__info-user">
            <LeftDataWrapper className="esp__tariffs__organization__left-data">
              <FormWrapper className="esp__tariffs__organization__form">
                <Form
                  hasAccount={hasAccount}
                  ref={this._formRef}
                  onChange={this._handlerChange}
                  disabled={inProccess}
                  onSubmit={this._handlerFormSubmit}
                />
              </FormWrapper>
            </LeftDataWrapper>
          </InfoUserWrapper>
          <TariffInfoWrapper className="esp__tariffs__organization__tariff-info">
            <RightDataWrapper className="esp__tariffs__organization__right-data">
              <RowWrapper className="esp__tariffs__organization__right-data">
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
                  <InputWrapper className="esp__tariffs__first-form__code-wpapper">
                    <Input value={comment} width={'100%'} name="comment" onChange={this._handlePromoCode} />
                  </InputWrapper>
                </FieldsWrapper>
              </RowWrapper>
            </RightDataWrapper>
          </TariffInfoWrapper>
        </MainContainerWrapper>
        <ButtonPanel price={price} priceTitle={priceTitle} />
      </TariffsOrganizationWrapper>
    );
  }
}

export default FirstData;
