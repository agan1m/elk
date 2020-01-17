import { h, Component } from 'preact';
import Tabs from '../../../components/_common/Tabs';
import {
  AddressLine,
  AddressTitle,
  AddressText,
  CompositionOrder,
  CompositionOrderName,
  CompositionOrderPrice,
  CompositionOrderContainer,
  CertItemWrapper,
  CertsContainer,
  TabsWrapper,
  AddressField,
  TabOrgIcon,
  TabCertIcon,
  TabOrderIcon,
  TabText,
} from './Wrappers';

interface IProps {
  data: any;
}
interface IState {
  activeIndex: number;
}

class TabsComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      activeIndex: 1,
    };
  }

  _handlerTabChange = ind => {
    this.setState({ activeIndex: ind });
  };

  render() {
    const { data = {} } = this.props;
    const { regCard = {}, tariffCalculation = {}, certOwners = [], wasUsedCertInEsp } = data;
    const {
      companyShortName,
      inn = '',
      kpp = '',
      factAddress = '',
      postAddress = '',
      contactPerson = {},
      companyBoss = {},
    } = regCard;
    const { fullName = '', email = '' } = contactPerson;
    const { fullName: bossfullName = '', email: bossEmail = '' } = companyBoss;
    const { services = [] } = tariffCalculation || {};
    const { activeIndex } = this.state;
    const tabs = [
      {
        menuItem: (
          <span className="esp__cabinet__request__tabs__menu-item" title="Организация">
            <TabText className="esp__cabinet__request__tabs__menu-item__text">Организация</TabText>
            <TabOrgIcon className="esp__cabinet__request__tabs__menu-item__icon" />
          </span>
        ),
        id: 1,
        render: () => (
          <div className="esp__cabinet__request__tabs__address">
            <AddressLine className="esp__cabinet__request__tabs__address__line">
              <AddressTitle className="esp__cabinet__request__tabs__address__line__title">
                {companyShortName || ''}
              </AddressTitle>
              <AddressText className="esp__cabinet__request__tabs__address__line__text">{`ИНН ${inn} ${
                kpp ? `КПП ${kpp}` : ''
              }`}</AddressText>
            </AddressLine>
            {factAddress ? (
              <AddressLine className="esp__cabinet__request__tabs__address__line">
                <AddressTitle className="esp__cabinet__request__tabs__address__line__title">
                  Фактический адрес:
                </AddressTitle>
                <AddressText className="esp__cabinet__request__tabs__address__line__text">
                  {factAddress || ''}
                </AddressText>
              </AddressLine>
            ) : null}
            {postAddress ? (
              <AddressLine className="esp__cabinet__request__tabs__address__line">
                <AddressTitle className="esp__cabinet__request__tabs__address__line__title">
                  Юридический адрес:
                </AddressTitle>
                <AddressText className="esp__cabinet__request__tabs__address__line__text">
                  {postAddress || ''}
                </AddressText>
              </AddressLine>
            ) : null}
            <AddressLine className="esp__cabinet__request__tabs__address__line">
              <AddressTitle className="esp__cabinet__request__tabs__address__line__title">Руководитель:</AddressTitle>
              <AddressText className="esp__cabinet__request__tabs__address__line__text">
                {bossfullName || ''}
                {bossEmail ? <AddressField>{`E-mail: ${bossEmail}`}</AddressField> : null}
              </AddressText>
            </AddressLine>
            <AddressLine className="esp__cabinet__request__tabs__address__line">
              <AddressTitle className="esp__cabinet__request__tabs__address__line__title">
                Контактное лицо:
              </AddressTitle>
              <AddressText className="esp__cabinet__request__tabs__address__line__text">
                {fullName || ''}
                {email ? <AddressField>{`E-mail: ${email || ''}`}</AddressField> : null}
              </AddressText>
            </AddressLine>
          </div>
        ),
      },
      {
        menuItem: (
          <span className="esp__esp__cabinet__request__tabs__menu-item" title="Владелец сертификата">
            <TabText className="esp__cabinet__request__tabs__menu-item__text">Владелец сертификата</TabText>
            <TabCertIcon className="esp__cabinet__request__tabs__menu-item__icon" />
          </span>
        ),
        id: 2,
        hide: wasUsedCertInEsp,
        render: () => (
          <CertsContainer className="esp__cabinet__request__tabs__certs-container">
            {certOwners &&
              certOwners.map((cert, ind) => (
                <CertItemWrapper key={ind} className="esp__cabinet__request__tabs__certs__item">
                  <AddressLine className="esp__cabinet__request__tabs__certs__item__line">
                    <AddressTitle className="esp__cabinet__request__tabs__certs__item__line__title">
                      {cert.fullName || `${cert.surname} ${cert.name} ${cert.middlename}`}
                    </AddressTitle>
                    <AddressText className="esp__cabinet__request__tabs__certs__item__line__text">
                      {`E-mail: ${cert.email || ''}`}
                      <br />
                      {`Должность: ${cert.dept || ''}`}
                      <br />
                      {`СНИЛС: ${cert.snils || ''}`}
                    </AddressText>
                  </AddressLine>
                </CertItemWrapper>
              ))}
          </CertsContainer>
        ),
      },
      {
        menuItem: (
          <span className="esp__cabinet__request__tabs__menu-item" title="Состав заказа">
            <TabText className="esp__cabinet__request__tabs__menu-item__text">Состав заказа</TabText>
            <TabOrderIcon className="esp__cabinet__request__tabs__menu-item__icon" />
          </span>
        ),
        id: 3,
        render: () => (
          <CompositionOrderContainer className="esp__cabinet__request__tabs__order-container">
            {services &&
              services.map((item: any, ind: number) => (
                <CompositionOrder key={ind} className="esp__cabinet__request__tabs__order__item">
                  <CompositionOrderName
                    className="esp__cabinet__request__tabs__order__item__name"
                    title={item.name || ''}
                  >
                    {item.name || ''}
                  </CompositionOrderName>
                  <CompositionOrderPrice className="esp__cabinet__request__tabs__order__item__price">
                    {item.totalPrice ? `${item.totalPrice}р` : ''}
                  </CompositionOrderPrice>
                </CompositionOrder>
              ))}
          </CompositionOrderContainer>
        ),
      },
    ];

    return (
      <TabsWrapper className="esp__cabinet__request__tabs-container">
        <Tabs onClick={this._handlerTabChange} active={activeIndex} style={'tabs'} tabs={tabs} />
      </TabsWrapper>
    );
  }
}

export default TabsComponent;
