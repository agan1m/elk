import { h, Component } from 'preact';
import format from 'tiny-date-format';
import AppSettings from '../../../appSettings';
import Table from '../../../components/_common/Table';
import StatusComponent from './StatusComponent';
import { getRequests } from '../../../LOGIN/services';
import Loader from '../../../components/_common/Loader';
import { IFilters } from './Interfaces';
import SwitchType from './SwitchType';
import { TableWrapper, RequestTypeContainer } from './Wrappers';

interface IState {
  isLoading: boolean;
  error: string;
  data: Array<Record<string, any>>;
  filters: IFilters;
}

class RequestListPage extends Component<any, IState> {
  _requestTimer: any;
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      error: '',
      data: [],
      filters: {
        status: -1,
        requestType: -1,
      },
    };
    this._requestTimer = null;
  }

  componentDidMount() {
    this._getRequests(true);
    this._requestTimer = setInterval(() => this._getRequests(false), AppSettings.DELAY_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this._requestTimer);
  }

  _getRequests = (isFirst: boolean) => {
    this.setState({ isLoading: isFirst });

    getRequests()
      .then((res: any) => {
        if (Array.isArray(res)) {
          this.setState({ isLoading: false, data: res });
        } else {
          throw Error(res);
        }
      })
      .catch((err: any) => {
        window.console.log(err);
        this.setState({ error: err, isLoading: false });
      });
  };

  _filterChange = (filters: any) => {
    this.setState({ filters }, () => this._getRequests(true));
  };

  _renderStatus(item: any) {
    const { status } = item;

    return <StatusComponent status={status} progress={status * 14.3} />;
  }

  _renderDate = (item: any) => {
    return <span className="esp__cabinet__request-list__cell-date">{this._parseDate(item.createdDate)}</span>;
  };

  _renderRequestType = (item: any) => {
    return (
      <RequestTypeContainer className="esp__cabinet__request-list__cell-request-type">
        <SwitchType requestType={item.requestType} />
      </RequestTypeContainer>
    );
  };

  _parseDate = (date: any) => {
    return date ? format(new Date(date), 'DD.MM.YYYY HH:mm') : '';
  };

  _handlerClickOnRow = (item: any) => {
    window.location.href = `${window.location}/${item.requestId}`;
  };

  render() {
    const { isLoading, data } = this.state;

    if (isLoading) {
      return <Loader />;
    }
    return (
      <TableWrapper className="esp__cabinet__request-list-table-container">
        {/* <Filter filters={filters} onChange={this._filterChange} /> */}
        <Table
          items={data}
          disabled={false}
          options={{
            rowActions: {
              use: true,
              onClick: this._handlerClickOnRow,
            },
          }}
          columns={[
            {
              title: 'Тип заявки',
              alias: 'requestType',
              props: {
                width: 200,
              },
              template: this._renderRequestType,
            },
            {
              title: 'Дата и время заявки',
              alias: 'createdDate',
              props: {
                width: 200,
              },
              template: this._renderDate,
            },
            {
              title: 'Статус заказа',
              props: {
                width: 200,
              },
              template: this._renderStatus,
            },
            {
              title: 'Номер заявки',
              alias: 'requestNumber',
            },
          ]}
        />
      </TableWrapper>
    );
  }
}

export default RequestListPage;
