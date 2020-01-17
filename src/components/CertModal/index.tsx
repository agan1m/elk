import { h, Component, createRef } from 'preact';
import CryptoPlugin from '../../helpers/CryptoApi';
import CertList from './CertList';
import WorkspaceError from './WorkspaceError';
import { CertModalWrapper, CloseIcon, ScrollContainer, ContainerModal } from './Wrappers';
import { IProps, IState, ICert } from './Interfaces';
import Link from './../../components/_common/Link';

class CertModal extends Component<IProps, IState> {
  triggerRef: any;
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
      certs: [],
      error: null,
      side: 'right',
    };
    this.triggerRef = createRef();
  }

  componentDidMount() {
    this._cryproInit().then((result: any) => {
      const { data = {}, error = {} } = result;
      const { certificates = [] } = data || {};
      const { message = null } = error || {};

      this.setState({ certs: certificates, error: message });
    });
  }

  _handlerOpen = () => {
    const { open } = this.state;
    const { current } = this.triggerRef;
    const triggerCoord = current.base.getBoundingClientRect();
    const coordX = triggerCoord.x + 750;
    let side = 'right';

    if (window.innerWidth < coordX) {
      side = 'left';
    }

    this.setState({ side, open: !open });
  };

  _handlerClose = () => {
    this.setState({ open: false });
  };

  _cryproInit = () => {
    return new Promise(resolve => {
      const cryptoPlugin = new CryptoPlugin();

      cryptoPlugin.getAllCertificatesFromStore('MY', (error: any, data: any) => {
        resolve({ error, data });
      });
    });
  };

  _handlerSelectCert = (cert: ICert) => {
    const { onSelect } = this.props;

    this.setState({ open: false }, () => onSelect(cert));
  };

  render() {
    const { open, certs, error, side } = this.state;
    const { trigger, disabled } = this.props;

    return (
      <ContainerModal className="esp__cert-modal">
        <Link
          ref={this.triggerRef}
          disabled={disabled}
          style={{ textDecoration: 'underline' }}
          onClick={this._handlerOpen}
        >
          {trigger}
        </Link>
        {open ? (
          <CertModalWrapper className="esp__cert-modal__wrapper" side={side}>
            <CloseIcon side={side} onClick={this._handlerClose}>
              &#10006;
            </CloseIcon>
            {error ? (
              <WorkspaceError error={error} />
            ) : (
              <ScrollContainer className="esp__cert-modal__scroll-contaioner">
                <CertList onSelect={this._handlerSelectCert} certs={certs} />
              </ScrollContainer>
            )}
          </CertModalWrapper>
        ) : null}
      </ContainerModal>
    );
  }
}

export default CertModal;
