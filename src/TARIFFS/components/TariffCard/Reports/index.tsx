import { h, Component } from 'preact';
import {
  CardWrapper,
  Content,
  HeaderWrapper,
  Button,
  Sale,
  PriceWrapper,
  Price,
  OldPrice,
  Period,
  PriceTitle,
  LabelPrice,
  ReportsToDepartmentsWrapper,
  ReportsToDepartmentsTitle,
  ExchangeDirection,
  ExchangeDirectionMoney,
  AddRouble,
  OptionsWrapper,
  OptionWrapper,
  OptionsTitle,
  TooltipWrapper,
  TooltipContent,
  OptionsDesc,
  NecesseryService,
  NecesseryIcon,
  NecesseryServiceList,
} from './Wrapper';

import { IProps, IState } from './../Interfaces';

const formatNumber = (num: any) => {
  const strArr = num.toString().split('');
  const arr = [];

  while (strArr.length) {
    arr.unshift(strArr.splice(-3, 3).join(''));
  }

  return arr.join(' ');
};

class TariffCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isServiceOpen: false,
    };
  }

  _handlerServiceSwitch = () => {
    const { isServiceOpen } = this.state;

    this.setState({ isServiceOpen: !isServiceOpen });
  };

  render() {
    const {
      name,
      sale,
      basePrice,
      price,
      paymentPeriod,
      paymentLabel,
      priceTitle,
      exchangeDirections = [],
      settings = [],
      isRecommended,
      onClickConnect,
      alone = false,
      necessaryServices = [],
    } = this.props;
    const { isServiceOpen } = this.state;

    const settingsFree = settings.filter(o => !o.atExtraCost);
    const settingsAtExtraCost = settings.filter(o => o.atExtraCost);

    return (
      <CardWrapper isRecommended={isRecommended} alone={alone} className="esp__tariffs__tariff-card">
        <Content className="esp__tariffs__tariff-card__content">
          <HeaderWrapper className="esp__tariffs__tariff-card__header">
            {name}
            <PriceTitle className="esp__tariffs__tariff-card__price-title">
              Система <a href="#module6">{priceTitle}</a>
            </PriceTitle>
          </HeaderWrapper>
          {sale ? <Sale className="esp__tariffs__tariff-card__sale">{`${sale}%`}</Sale> : null}
          <PriceWrapper className="esp__tariffs__tariff-card__price-wrapper">
            {sale ? (
              <div className="esp__tariffs__tariff-card__price-info">
                <OldPrice className="esp__tariffs__tariff-card__old-price">{formatNumber(basePrice)}</OldPrice>
                <Price className="esp__tariffs__tariff-card__price">{formatNumber(price)}</Price>
                <Period className="esp__tariffs__tariff-card__period">{paymentPeriod}</Period>
                <LabelPrice className="esp__tariffs__tariff-card__label-price">{paymentLabel}</LabelPrice>
              </div>
            ) : (
              <div>
                <Price className="esp__tariffs__tariff-card__price">{formatNumber(basePrice)}</Price>
                <Period className="esp__tariffs__tariff-card__period">{paymentPeriod}</Period>
                <LabelPrice className="esp__tariffs__tariff-card__label-price">{paymentLabel}</LabelPrice>
              </div>
            )}
          </PriceWrapper>
          {onClickConnect ? (
            <Button className="esp__tariffs__tariff-card__button" onClick={onClickConnect}>
              Подключиться
            </Button>
          ) : null}
          <ReportsToDepartmentsWrapper className="esp__tariffs__tariff-card__reports-to-departament-wrapper">
            <ReportsToDepartmentsTitle className="esp__tariffs__tariff-card__reports-to-departament-title">
              Отчетность в подразделения
            </ReportsToDepartmentsTitle>
            {exchangeDirections
              .sort((one: any, two: any) => (one.sortOrder > two.sortOrder ? 1 : -1))
              .map((dir: any) => {
                const { name, displayName, atExtraCost, price = '' } = dir;

                return atExtraCost ? (
                  <ExchangeDirectionMoney className="esp__tariffs__tariff-card__exchange-direction-money" key={name}>
                    <TooltipWrapper className="esp__tariffs__tariff-card__tooltip-wrapper">
                      {displayName}
                      <AddRouble className="esp__tariffs__tariff-card__add-ruble" />
                      <TooltipContent className="esp__tariffs__tariff-card__tooltip-content">
                        <Price className="esp__tariffs__tariff-card__price" fontSize={'16px'}>
                          {formatNumber(price)}
                        </Price>
                        <Period className="esp__tariffs__tariff-card__period">{paymentPeriod}</Period>
                        <br />
                        Вы сможете добавить это направление при оформлении заказа
                      </TooltipContent>
                    </TooltipWrapper>
                  </ExchangeDirectionMoney>
                ) : (
                  <ExchangeDirection className="esp__tariffs__tariff-card__exchange-direction" key={name}>
                    {displayName}
                  </ExchangeDirection>
                );
              })}
          </ReportsToDepartmentsWrapper>
          {settingsFree.length > 0 ? (
            <OptionsWrapper className="esp__tariffs__tariff-card__options-wrapper">
              {settingsFree.map(o => {
                const { settingName, settingDisplayName, description, tooltip } = o;

                return (
                  <OptionWrapper className="esp__tariffs__tariff-card__option-wrapper" key={settingName}>
                    <TooltipWrapper className="esp__tariffs__tariff-card__tooltip-wrapper" disabled={!tooltip}>
                      <OptionsTitle className="esp__tariffs__tariff-card__option-title">
                        {settingDisplayName}
                      </OptionsTitle>
                      <TooltipContent className="esp__tariffs__tariff-card__tooltip-content">{tooltip}</TooltipContent>
                    </TooltipWrapper>
                    <OptionsDesc className="esp__tariffs__tariff-card__option-desc">{description}</OptionsDesc>
                  </OptionWrapper>
                );
              })}
              <NecesseryService
                className="esp__tariffs__tariff-card__necessery-service"
                onClick={this._handlerServiceSwitch}
              >
                +{necessaryServices.length} НУЖНЫХ СЕРВИСОВ
                <NecesseryIcon className="esp__tariffs__tariff-card__necessery-icon" isServiceOpen={isServiceOpen} />
              </NecesseryService>
              <NecesseryServiceList
                className="esp__tariffs__tariff-card__necessery-service-list"
                isServiceOpen={isServiceOpen}
              >
                {necessaryServices.map((service, index) => (
                  <OptionsDesc className="esp__tariffs__tariff-card__options-desc" key={index}>
                    {service}
                  </OptionsDesc>
                ))}
              </NecesseryServiceList>
            </OptionsWrapper>
          ) : null}

          {settingsAtExtraCost.length > 0 ? (
            <OptionsWrapper className="esp__tariffs__tariff-card__options-wrapper">
              <OptionsTitle className="esp__tariffs__tariff-card__options-title" uppercase={true}>
                За дополнительную плату
                <AddRouble />
              </OptionsTitle>
              {settingsAtExtraCost.map(o => {
                const { settingName, settingDisplayName } = o;

                return (
                  <div key={settingName}>
                    <OptionsDesc className="esp__tariffs__tariff-card__options-desc">{settingDisplayName}</OptionsDesc>
                  </div>
                );
              })}
            </OptionsWrapper>
          ) : null}
        </Content>
      </CardWrapper>
    );
  }
}

export default TariffCard;
