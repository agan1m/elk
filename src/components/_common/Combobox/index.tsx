import { h, Component } from 'preact';
import { IProps, IState } from './Interfaces';
import ArrowIcon from '../../Icons/ArrowIcon';
import ProfileIcon from '../../Icons/ProfileIcon';
import PasswordIcon from '../../Icons/PasswordIcon';
import ProductIcon from '../../Icons/ProductIcon';
import LogoutIcon from '../../Icons/LogoutIcon';
import {
  ComboboxWrapper,
  ComboboxContainer,
  ComboboxHeader,
  ComboboxItem,
  IconWrap,
  ComboboxItemName,
} from './Wrappers';
import CookieUtil from '../../../helpers/CookieUtil';
import { sendTokenEvent } from '../../../helpers/EventUtil';

export default class Combobox extends Component<IProps, IState> {
  _onClose: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this._onClose = this._handlerClose.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this._onClose);
    document.addEventListener('scroll', this._onClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._onClose);
    document.removeEventListener('scroll', this._onClose);
  }

  _handlerClose = () => {
    this.setState({ isOpen: false });
  };

  _handlerOpen = (ev: any) => {
    ev && ev.stopPropagation();
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  _handlerItemClick = (ev: any) => {
    ev && ev.stopPropagation();
    window.location.href = `${window.location.protocol}//${window.location.host}/account/#/requests`;
    this.setState({ isOpen: false });
  };

  _handlerLogout = (ev: any) => {
    const { onLogIn } = this.props;

    ev && ev.stopPropagation();
    CookieUtil.deleteCookie('profile');
    CookieUtil.deleteCookie('Token');
    sendTokenEvent('');

    this.setState({ isOpen: false }, () => onLogIn(false, {}));
    const isSpa = window.location.href.indexOf('account');

    if (isSpa > 0) {
      window.location.href = `${window.location.protocol}//${window.location.host}`;
      window.location.reload();
    }
  };

  _handlerItemClickReset = (ev: any) => {
    ev && ev.stopPropagation();
    window.location.href = `${window.location.protocol}//${window.location.host}/account/#/restorepassword`;
    this.setState({ isOpen: false });
  };

  _handlerItemClickProducts = (ev: any) => {
    ev && ev.stopPropagation();
    window.location.href = `${window.location.protocol}//${window.location.host}/account/#/products`;
    this.setState({ isOpen: false });
  };

  render() {
    const { caption } = this.props;
    const { inn = '', kpp = '', name = '', shortName, ShortName, Kpp, Inn } = caption;
    const { isOpen } = this.state;

    return (
      <ComboboxWrapper className="esp__combobox">
        <ComboboxHeader
          className="esp__combobox__header"
          title={shortName || name || ShortName}
          onClick={this._handlerOpen}
        >
          <span style={{ marginRight: 15 }}>{shortName || name || ShortName}</span>
          <br />
          <span style={{ marginRight: 5 }}>{`${inn || Inn} ${kpp || Kpp ? `/ ${kpp || Kpp}` : ''}`}</span>
          <ArrowIcon className="esp__combobox__arrow-icon" width={10} />
        </ComboboxHeader>
        <ComboboxContainer className="esp__combobox__container" open={isOpen}>
          <ComboboxItem className="esp__combobox__item" onClick={this._handlerItemClick}>
            <IconWrap className="esp__combobox__icon-wrap">
              <ProfileIcon />
            </IconWrap>
            <ComboboxItemName className="esp__combobox__item-name">Мои заявки</ComboboxItemName>
          </ComboboxItem>
          <ComboboxItem className="esp__combobox__item" onClick={this._handlerItemClickProducts}>
            <IconWrap className="esp__combobox__icon-wrap">
              <ProductIcon />
            </IconWrap>
            <ComboboxItemName className="esp__combobox__item-name">Продукты</ComboboxItemName>
          </ComboboxItem>
          <ComboboxItem className="esp__combobox__item" onClick={this._handlerItemClickReset}>
            <IconWrap className="esp__combobox__icon-wrap">
              <PasswordIcon style={{ paddingTop: 2 }} />
            </IconWrap>
            <ComboboxItemName className="esp__combobox__item-name">Сменить пароль</ComboboxItemName>
          </ComboboxItem>
          <ComboboxItem className="esp__combobox__item" onClick={this._handlerLogout}>
            <IconWrap className="esp__combobox__icon-wrap">
              <LogoutIcon />
            </IconWrap>
            <ComboboxItemName className="esp__combobox__item-name">Выйти</ComboboxItemName>
          </ComboboxItem>
        </ComboboxContainer>
      </ComboboxWrapper>
    );
  }
}
