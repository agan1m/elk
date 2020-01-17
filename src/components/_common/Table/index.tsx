import { h, Component, createRef } from 'preact';
import { IProps, IState } from './Interfaces';
import {
  TableWrapper,
  TableBody,
  TableHeader,
  HeaderTitle,
  HeaderCell,
  BodyRow,
  TableCell,
  NoDataWrapper,
} from './Wrappers';

export default class Table extends Component<IProps, IState> {
  table: any;
  tableCols: any;
  tableHead: any;
  state: IState;
  constructor(props: IProps) {
    super(props);

    this.state = this._setState(props);
    this.table = createRef();
    this.tableCols = createRef();
    this.tableHead = createRef();
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { options = {} } = nextProps;
    const { inProcess } = options;

    if (JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)) {
      this.setState({
        isIndeterminate: false,
        inProcess: inProcess,
      });
    } else {
      this.setState({
        inProcess: inProcess,
      });
    }
  }

  _setState(state: any) {
    const { options = {} } = this.props;
    const { rowActions, inProcess = {} } = options;

    return {
      disabled: state.disabled || false,
      rowActions: {
        use: rowActions.use || false,
        onClick: rowActions.onClick || null,
        onWheelClick: rowActions.onWheelClick || null,
        onContextClick: rowActions.onContextClick || null,
        check: rowActions.check || null,
      },
      inProcess: {
        use: inProcess.use || false,
        state: inProcess.state || false,
        template: inProcess.template || null,
      },
      isIndeterminate: state.isIndeterminate || false,
    };
  }

  _clickOnTableCell(item: any) {
    const { rowActions, disabled } = this.state;

    if (rowActions.use && !disabled) {
      if (rowActions.hasOwnProperty('onClick')) {
        rowActions.onClick.call(this, item);
      }
    }
  }

  _handleClick(item: any, ev: any) {
    const { rowActions, disabled } = this.state;

    if (rowActions.use && !disabled) {
      if (rowActions.hasOwnProperty('onClick')) {
        if (ev.button) {
          if (ev.button !== 1 && ev.button !== 2) {
            rowActions.onClick.call(this, item);
          }
        } else {
          rowActions.onClick.call(this, item);
        }
      }
    }
  }

  _processAboveValue(column: any, value: any) {
    if ('process' in column) {
      const process = column['process'];

      if (!value) {
        if ('defaultValue' in process) {
          return process.defaultValue;
        }
      }

      if ('formattingValue' in process) {
        return process.formattingValue.call(this, value);
      }
    }

    return value;
  }

  _renderNoData(noDataString: any) {
    const { columns } = this.props;

    return (
      <tr className="esp__table__tr-nodata">
        <td className="esp__table__td-nodata" colSpan={columns.length}>
          <NoDataWrapper>{noDataString}</NoDataWrapper>
        </td>
      </tr>
    );
  }

  _renderHeaderText(item: any, key: any) {
    return (
      <span className={`esp__table__header-text ${item || ''}`} key={key}>
        {item}
        <br />
      </span>
    );
  }

  _renderColGroup(column: any, index: any) {
    return column['show'] === false ? null : (
      <col
        className={'esp__table__col'}
        key={index}
        width={'props' in column ? this._getWidth(column.props['width']) : ''}
      />
    );
  }

  _getWidth = (width: any) => {
    return width && Number.isInteger(width) ? width + 'px' : width;
  };

  _renderTableRow(item: any, index: any) {
    const { columns } = this.props;

    return (
      <BodyRow className={'esp__table__body-row'} key={index}>
        {columns.map(this._renderTD.bind(this, item))}
      </BodyRow>
    );
  }

  _renderTD(item: any, column: any, index: any) {
    if ('show' in column) {
      if (!column['show']) {
        return;
      }
    }

    return (
      <TableCell
        className={'esp__table__cell'}
        style={{ maxWidth: 'props' in column ? this._getWidth(column.props['width']) : '' }}
        onClick={this._handleClick.bind(this, item)}
        key={index}
      >
        {'template' in column ? (
          column['template'].call(this, item)
        ) : (
          <span>{this._processAboveValue(column, item[column['alias']])}</span>
        )}
      </TableCell>
    );
  }

  _renderTH(column: any, index: any) {
    if ('show' in column) {
      if (!column['show']) {
        return;
      }
    }

    return (
      <HeaderCell className="esp__table__header-cell" key={index}>
        <HeaderTitle className="esp__table__header-title">
          {column['title'] && typeof column['title'] === 'string'
            ? column['title'].split('\n').map(this._renderHeaderText.bind(this))
            : column['title']}
        </HeaderTitle>
      </HeaderCell>
    );
  }

  render() {
    const { items, columns, nodataComponent } = this.props;

    const { inProcess } = this.state;

    const { noDataText = null } = this.props;
    const noDataString = noDataText ? noDataText : 'Нет данных';

    return (
      <TableWrapper className="esp__table" ref={this.table}>
        <colgroup ref={this.tableCols}>{columns.map(this._renderColGroup.bind(this))}</colgroup>
        <TableHeader className="esp__table__header" ref={this.tableHead}>
          <tr>{columns.map(this._renderTH.bind(this))}</tr>
        </TableHeader>
        {inProcess && inProcess.use && inProcess.state ? (
          <caption className="esp__table__message">
            {inProcess.template ? inProcess.template() : <p className="tp-paragraph">Загрузка данных...</p>}
          </caption>
        ) : items.length ? (
          <TableBody className="esp__table__body">{items.map(this._renderTableRow.bind(this))}</TableBody>
        ) : (
          <TableBody className="esp__table__body">{nodataComponent || this._renderNoData(noDataString)}</TableBody>
        )}
      </TableWrapper>
    );
  }
}
