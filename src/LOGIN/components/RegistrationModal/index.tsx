import { h, Component, createRef } from 'preact';
import { ContainerModal, RegistrationModalWrapper, RegistrationHeader, RegTitle, SmallText } from './Wrappers';
import Link from '../../../components/_common/Link';
import Tabs from './../../../components/_common/Tabs';
import Login from './LoginComponent';
import Registration from './RegistrationComponent';
import Certificat from './CertsComponent';

interface IProps {
  trigger: any;
  onLogIn: Function;
}
interface IState {
  open: boolean;
  activeTab: number;
}

class RegistrationModal extends Component<IProps, IState> {
  _registration: any;
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
      activeTab: 1,
    };

    this._registration = createRef();
  }

  componentDidMount() {
    window.addEventListener('mousedown', this._handlerClose);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this._handlerClose);
  }

  _handlerOpen = (e: any) => {
    const { open } = this.state;

    e.stopPropagation();
    this.setState({ open: !open, activeTab: 1 });
  };

  _handlerClose = () => {
    this.setState({ open: false });
  };

  handlerTabClick = (type: number) => {
    this.setState({ activeTab: type });
  };

  _handlerRegistrationByInn = (inn: number) => {
    this.setState({ activeTab: 3 }, () => {
      const { current = null } = this._registration || {};

      current && current.selectCert({ inn });
    });
  };

  _stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  render() {
    const { open, activeTab } = this.state;
    const { trigger, onLogIn } = this.props;

    return (
      <ContainerModal
        className="esp__auth__modal__container"
        onMouseDown={this._stopPropagation}
        onClick={this._stopPropagation}
      >
        <Link onClick={this._handlerOpen}>{trigger}</Link>
        {open ? (
          <RegistrationModalWrapper
            className="esp__auth__modal"
            activeTab={activeTab}
            width={activeTab === 3 && '385px'}
          >
            {activeTab === 3 ? (
              <RegistrationHeader className="esp__auth__header">
                <RegTitle className="esp__auth__header__title">Регистрация</RegTitle>
                <SmallText className="esp__auth__header__title_small">
                  Уже зарегистрированы? <Link onClick={() => this.handlerTabClick(1)}>Войти</Link>
                </SmallText>
              </RegistrationHeader>
            ) : (
              <Tabs
                style="points"
                onClick={this.handlerTabClick}
                tabs={[{ id: 1, name: 'По логину' }, { id: 2, name: 'По сертификату' }]}
                active={activeTab}
              />
            )}
            {activeTab === 1 ? <Login onLogIn={onLogIn} tabId={3} onChangeTab={this.handlerTabClick} /> : null}
            {activeTab === 2 ? <Certificat onLogIn={onLogIn} onRegistration={this._handlerRegistrationByInn} /> : null}
            {activeTab === 3 ? <Registration onLogIn={onLogIn} ref={this._registration} /> : null}
          </RegistrationModalWrapper>
        ) : null}
      </ContainerModal>
    );
  }
}

export default RegistrationModal;
