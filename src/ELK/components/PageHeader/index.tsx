import { h, Component } from 'preact';
import format from 'tiny-date-format';
import ArrowIcon from '../../../components/Icons/ArrowIcon';
import { HeaderTopLine, ArrowBack, HeaderSubLine, StatusText } from './Wrappers';
import { STATUSES } from '../../constants';
import SwitchType from '../RequestListPage/SwitchType';

interface IProps {
  createdDate: string;
  status: number;
  requestType: number;
}

class PageHeader extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  _parseDate = (createdDate: string | number | Date) => {
    if (createdDate) {
      const timeOffset = new Date().getTimezoneOffset();
      const minutes = new Date(createdDate).getMinutes();
      const date = new Date(createdDate).setMinutes(timeOffset + minutes);
      const formatedDate = format(new Date(date), 'HH:mm DD.MM.YYYY');

      return formatedDate;
    }
  };

  _onBack = () => {
    window.location.href = `${window.location.origin}/account/#/requests`;
  };

  render() {
    const { createdDate, status, requestType } = this.props;
    const iconStyle = { marginRight: 5 };

    return (
      <div className="esp__cabinet__request__header__container">
        <HeaderTopLine className="esp__cabinet__request__header__top-line">
          <ArrowBack className="esp__cabinet__request__header__arrow-container" onClick={this._onBack}>
            <ArrowIcon className="esp__cabinet__request__header__arrow-icon" width={15} height={15} />
          </ArrowBack>
          <SwitchType width={30} height={30} requestType={requestType} style={iconStyle} />
        </HeaderTopLine>
        <HeaderSubLine className="esp__cabinet__request__header__sub-line">{`Заказ от ${this._parseDate(
          createdDate,
        )}`}</HeaderSubLine>
        <HeaderSubLine className="esp__cabinet__request__header__sub-line">
          {'Статус: '}
          <StatusText className="esp__cabinet__request__header__status-text" step={status}>
            {STATUSES[status]}
          </StatusText>
        </HeaderSubLine>
      </div>
    );
  }
}

export default PageHeader;
