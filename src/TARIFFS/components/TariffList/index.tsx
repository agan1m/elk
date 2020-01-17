import { h, Component } from 'preact';

import TariffCard from '../TariffCard';
import Tabs from './../../../components/_common/Tabs';
import { TariffListWrapper, SpinnerWrapper, SpinnerContentWrapper, TabBorder } from './Wrapper';
import { TYPE } from './../../../constants';

//времянка, удалить после правок на бэке
import ReportsListData from './tempReportsData';
import EdoListData from './tempEdoData';

// import { getTariffs } from '../../services';
import { IProps, IState, ITarif } from './Interfaces';

class TariffList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isSpecialMode: false,
      cards: [],
      isWait: true,
    };
  }

  _getListDataByType(type: number, regionCode: number) {
    switch (type) {
      case TYPE.EDO:
        return EdoListData(regionCode);
      case TYPE.REPORTS:
        return ReportsListData(regionCode);
    }
  }

  async componentDidMount() {
    try {
      const { regionCode, type } = this.props;
      // const { regionCode, productType } = this.props;
      // const data = await getTariffs(regionCode, productType);

      const data: any = await this._getListDataByType(type, regionCode);

      // const data = await ListData(regionCode);

      const filtrData = this._filtrationExchangeDirections(data);

      this.setState({ cards: filtrData, isWait: false });
    } catch (e) {
      this.setState({ isWait: false });
      window.console.log(e);
    }
  }

  _filtrationExchangeDirections = (data: ITarif[]): ITarif[] => {
    data.forEach(item => {
      item.exchangeDirections = item.exchangeDirections.filter(d => d.min > 0 || d.max > 0);
      item.settings = item.settings.filter(d => d.min > 0 || d.max > 0);
    });
    return data;
  };

  _handlerTabClick = (type: any) => {
    this.setState({ isSpecialMode: type });
  };

  _onClickConnect = (tariff: object) => {
    const { changeStep, isAuth } = this.props;

    changeStep(isAuth ? 3 : 2, { tariff });
  };

  render() {
    const { isSpecialMode, cards, isWait } = this.state;
    const { inProccess, type } = this.props;

    const cardsFilter = cards.filter(card => card.isSpecialMode === isSpecialMode);
    const hasSpecialCards = !!cards.filter(card => card.isSpecialMode === true).length;

    return (
      <div className="esp__tariffs__list">
        {hasSpecialCards ? (
          <Tabs
            title="Ваш налоговый режим"
            onClick={this._handlerTabClick}
            tabs={[
              {
                id: false,
                name: 'Общий или смешанный',
                tooltip: (
                  <span>
                    Подходит для налогового режима
                    <br /> <b>ОСНО</b>
                  </span>
                ),
              },
              {
                id: true,
                name: 'Специальный',
                tooltip: (
                  <span>
                    Подходит для налоговых режимов:
                    <br /> <b>УСНО, ЕНВД, ЕСН, патентная система налогооблажения</b>
                  </span>
                ),
              },
            ]}
            active={isSpecialMode}
          />
        ) : null}
        <TabBorder className="esp__tariffs__list__tab-border" />
        {isWait || inProccess ? (
          <SpinnerContentWrapper>
            <SpinnerWrapper />
          </SpinnerContentWrapper>
        ) : (
          <TariffListWrapper className="esp__tariffs__list__wrapper">
            {cardsFilter.map(card => (
              <TariffCard
                key={card.name}
                {...card}
                type={type}
                onClickConnect={(data: any) => this._onClickConnect({ ...card, ...data })}
              />
            ))}
          </TariffListWrapper>
        )}
      </div>
    );
  }
}

export default TariffList;
