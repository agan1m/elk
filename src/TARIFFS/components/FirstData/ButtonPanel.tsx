import { h, Component } from 'preact';
import Link from './../../../components/_common/Link';
import { ButtonPanelWrap, ButtonPanelText } from './Wrappers';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    $: any;
  }
}

interface IProps {
  price?: number;
  priceTitle?: string;
}

class ButtonPanel extends Component<IProps> {
  _handlerPhoneClick = (event: any) => {
    if (!window.$.fancybox || !window.$) {
      return;
    }

    const { price, priceTitle } = this.props;

    event && event.preventDefault();

    window.$.fancybox.open('#connectForm', {
      height: 'inline',
      autoHeight: true,
      scrolling: 'no',
      padding: 25,
      fitToView: true,
      autoSize: false,
      beforeShow: function() {
        const selectTariff = `${priceTitle} за ${price} рублей`;

        window.$('#form_hidden_795').attr('value', selectTariff);
      },
    });
  };

  render() {
    return (
      <ButtonPanelWrap className="esp__tariffs__button-panel">
        <ButtonPanelText className="esp__tariffs__button-panel__text">
          Есть вопросы? Оформите заказ по{' '}
          <Link href="tel:84957307345" onClick={this._handlerPhoneClick}>
            телефону
          </Link>
          !
        </ButtonPanelText>
      </ButtonPanelWrap>
    );
  }
}

export default ButtonPanel;
