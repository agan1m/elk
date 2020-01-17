import { h, Component } from 'preact';
import {
  Content,
  HeaderWrapper,
  Button,
  PriceWrapper,
  Price,
  OldPrice,
  PriceTitle,
  LabelPrice,
  ReportsToDepartmentsWrapper,
  ReportsToDepartmentsTitle,
  ExchangeDirection,
  AddRouble,
  OptionsWrapper,
  OptionWrapper,
  OptionsTitle,
  TooltipWrapper,
  TooltipContent,
  OptionsDesc,
  CardWrapper,
  RangeWrapper,
  RangeTitle,
} from './Wrapper';

import { IProps, IState } from './../Interfaces';

import Range from './../../../../components/_common/Range';

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
      price: props.price,
    };
  }

  _handlerServiceSwitch = () => {
    const { isServiceOpen } = this.state;

    this.setState({ isServiceOpen: !isServiceOpen });
  };

  _handlerPriceRange = (key: any) => {
    const { rangePrice } = this.props;
    const marks = this._getMarksByPrice();
    const rangeKey = marks[key].replace(/\s+/g, '');

    this.setState({ price: rangePrice[rangeKey] });
  };

  _handlerClick = () => {
    const { onClickConnect, rangePrice, name } = this.props;
    const { price } = this.state;
    const numberOfDocuments = rangePrice && Object.keys(rangePrice).find(key => rangePrice[key] === price);

    onClickConnect && onClickConnect({ price, numberOfDocuments, name });
  };

  _getMarksByPrice = () => {
    const { rangePrice } = this.props;

    if (!rangePrice) {
      return false;
    }

    const rangeKeys = Object.keys(rangePrice);
    const procent = Math.ceil(100 / rangeKeys.length);

    return rangeKeys.reduce((previousValue: any, currentValue: any, currentIndex: any) => {
      return { ...(previousValue as object), [+currentIndex * procent]: formatNumber(+currentValue) };
    }, {});
  };

  render() {
    const {
      name,
      sale,
      basePrice,
      paymentPeriod,
      paymentLabel,
      onClickConnect,
      settings = [],
      isRecommended,
      alone = false,
      necessaryServices = [],
    } = this.props;
    const { price } = this.state;

    const settingsFree = settings.filter(o => !o.atExtraCost);
    const settingsAtExtraCost = settings.filter(o => o.atExtraCost);
    const marks = this._getMarksByPrice();
    const markKeys = marks && Object.keys(marks);

    return (
      <CardWrapper isRecommended={isRecommended} alone={alone} className="esp__tariffs__tariff-card">
        <Content className="esp__tariffs__tariff-card__content">
          <HeaderWrapper className="esp__tariffs__tariff-card__header">
            {name}
            <PriceTitle className="esp__tariffs__tariff-card__price-title">Срок действия {paymentPeriod}</PriceTitle>
          </HeaderWrapper>
          {necessaryServices.length ? (
            <ReportsToDepartmentsWrapper className="esp__tariffs__tariff-card__reports-to-departament-wrapper">
              <ReportsToDepartmentsTitle className="esp__tariffs__tariff-card__reports-to-departament-title">
                ЧТО ВХОДИТ В ТАРИФ
              </ReportsToDepartmentsTitle>
              {necessaryServices.map((service: any, index: any) => (
                <ExchangeDirection className="esp__tariffs__tariff-card__exchange-direction" key={index}>
                  {service}
                </ExchangeDirection>
              ))}
              {marks ? (
                <RangeWrapper className="esp__tariffs__tariff-card__range-wrapper">
                  <RangeTitle className="esp__tariffs__tariff-card__range-title">
                    ВЫБЕРИТЕ ПАКЕТ ИСХОДЯЩИХ ДОКУМЕНТОВ
                  </RangeTitle>
                  <Range
                    dots={false}
                    min={Number(markKeys[0])}
                    max={Number(markKeys[markKeys.length - 1])}
                    defaultValue={Number(markKeys[0])}
                    marks={marks}
                    step={null}
                    onChange={this._handlerPriceRange}
                  />
                </RangeWrapper>
              ) : null}
            </ReportsToDepartmentsWrapper>
          ) : null}
          {price ? (
            <PriceWrapper className="esp__tariffs__tariff-card__price-wrapper">
              {sale ? (
                <div className="esp__tariffs__tariff-card__price-info">
                  <OldPrice className="esp__tariffs__tariff-card__old-price">{formatNumber(basePrice)}</OldPrice>
                  <Price className="esp__tariffs__tariff-card__price">{!!Number(price) && formatNumber(price)}</Price>
                  <LabelPrice className="esp__tariffs__tariff-card__label-price">{paymentLabel}</LabelPrice>
                </div>
              ) : (
                <div className="esp__tariffs__tariff-card__price-info">
                  {Number(price) ? (
                    <Price className="esp__tariffs__tariff-card__price">{formatNumber(price)}</Price>
                  ) : null}
                  <LabelPrice className="esp__tariffs__tariff-card__label-price">{paymentLabel}</LabelPrice>
                </div>
              )}
            </PriceWrapper>
          ) : null}
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
        {onClickConnect ? (
          <Button className="esp__tariffs__tariff-card__button" color={'#000000'} onClick={this._handlerClick}>
            Подключиться
          </Button>
        ) : null}
      </CardWrapper>
    );
  }
}

export default TariffCard;
