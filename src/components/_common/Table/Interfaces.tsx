export interface IProps {
  options?: IOptions;
  items: Array<Object>;
  columns: Array<IColumns>;
  scrollHeaders?: boolean;
  disabled?: boolean;
  nodataComponent?: any;
  noDataText?: any;
}

interface IOptions {
  sortable?: ISortable;
  multipleSelect?: IMultiSelect;
  rowActions?: IRowActions;
  rowClassName?: Function;
  inProcess?: IinPropcess;
}

interface IColumns {
  show?: boolean;
  title?: string;
  alias?: string;
  props?: Object;
  template?: any;
}

interface IinPropcess {
  use?: boolean;
  state?: boolean;
  template?: any;
}

interface IMultiSelect {
  use?: boolean;
  state?: boolean;
  selected?: Array<number>;
  disabled?: boolean;
  onCheck?: Function;
}

interface IRowActions {
  use: boolean;
  check?: any;
  onClick?: Function;
  onWheelClick?: Function;
  onContextClick?: Function;
}

interface ISortable {
  use: boolean;
  defaultColumn?: string;
  defaultRow?: string;
  defaultDirect?: string;
  onChange?: Function;
}

export interface IState {
  options?: IOptions;
  scrollHeaders?: boolean;
  disabled?: boolean;
  nodataComponent?: any;
  noDataText?: any;
  isIndeterminate?: boolean;
  inProcess?: IinPropcess;
  rowActions?: IRowActions;
}
