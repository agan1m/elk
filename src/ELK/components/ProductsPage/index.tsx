import { h, Component } from 'preact';
import { getProductList } from './../../../LOGIN/services';
import Loader from './../../../components/_common/Loader';
import {
  PageWrapper,
  ItemWrapper,
  ItemContent,
  HeaderTitle,
  HeaderIconWrapper,
  HeaderWrapper,
  BodyWrapper,
  FooterWrapper,
} from './Wrappers';
import {
  ReportingIcon,
  DosyeIcon,
  FilerIcon,
  OFDIcon,
  UCIcon,
  VetisIcon,
} from '../../../components/Icons/ProductsIcon';
import Button from './../../../components/_common/Button';
import Link from './../../../components/_common/Link';
import { IProduct } from './Interfaces';

interface IState {
  isLoading: boolean;
  error: string;
  products: IProduct[];
}

export const productStatus = {
  connected: 0,
  connecting: 1,
  notConnected: 2,
};

export const productType = {
  otchetnost: 15,
  uc: 11,
  ofd: 3,
  filer: 0,
  vetis: 14,
  dosye: 10,
};

class ProductsPage extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
      error: '',
      products: [
        {
          name: 'Отчетность',
          description: 'Сдача отчетности через Интернет',
          productState: productStatus.notConnected,
          productType: productType.otchetnost,
          infoUrl: 'https://taxcom.ru/otchetnost/',
          loginUrl: 'https://taxcom.ru/otchetnost/',
        },
        {
          name: 'Услуги УЦ',
          description: 'Ключи электронной подписи',
          productState: productStatus.notConnected,
          productType: productType.uc,
          infoUrl: 'https://taxcom.ru/centr/',
          loginUrl: 'https://taxcom.ru/centr/',
        },
        {
          name: 'ОФД Такском',
          description: 'Передача и обработка фискальных данных',
          productState: productStatus.connecting,
          productType: productType.ofd,
          infoUrl: 'https://taxcom.ru/ofd/',
          loginUrl: 'https://taxcom.ru/ofd/',
        },
        {
          name: 'Такском-Файлер',
          description: 'Электронный документооборот',
          productState: productStatus.notConnected,
          productType: productType.filer,
          infoUrl: 'https://taxcom.ru/dokumentooborot/',
          loginUrl: 'https://taxcom.ru/dokumentooborot/',
        },
        {
          name: 'Такском-Ветис',
          description: 'Сервис для комфортной работы с ФГИС "Меркурий"',
          productState: productStatus.connecting,
          productType: productType.vetis,
          infoUrl: 'https://taxcom.ru/vetis/',
          loginUrl: 'https://taxcom.ru/vetis/',
        },
        {
          name: 'Досье',
          description: 'Моментальная проверка контрагентов в официальных источниках',
          productState: productStatus.connected,
          productType: productType.dosye,
          infoUrl: 'https://taxcom.ru/dosie/',
          loginUrl: 'https://taxcom.ru/dosie/',
        },
      ],
    };
  }

  componentDidMount() {
    this._getProducts();
  }

  _getProducts = async () => {
    this.setState({ isLoading: true });

    try {
      const products = await getProductList();

      this.setState({ products, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false, error: 'Что-то пошло не так' }, () => console.error(error));
    }
  };

  _getButtonTextByType(type: number) {
    switch (type) {
      case productStatus.notConnected:
        return 'Подключить';
      case productStatus.connecting:
        return 'Перейти к заявке';
      case productStatus.connected:
        return 'Перейти';
    }
  }

  _getIconByType(type: number) {
    switch (type) {
      case productType.otchetnost:
        return <ReportingIcon width={30} height={30} />;
      case productType.dosye:
        return <DosyeIcon width={30} height={30} />;
      case productType.filer:
        return <FilerIcon width={30} height={30} />;
      case productType.ofd:
        return <OFDIcon width={30} height={30} />;
      case productType.uc:
        return <UCIcon width={30} height={30} />;
      case productType.vetis:
        return <VetisIcon width={30} height={30} />;
    }
  }

  _handlerProductClick = (loginUrl: string) => {
    window.open(loginUrl, '_blank');
  };

  _renderProductTemplate = (product: IProduct) => {
    return (
      <ItemWrapper
        className="esp__cabinet__products__item-wrapper"
        status={product.productState}
        type={product.productType}
      >
        <ItemContent className="esp__cabinet__products__item-content">
          <HeaderWrapper className="esp__cabinet__products__header-wrapper">
            <HeaderIconWrapper className="esp__cabinet__products__header-icon-wrapper">
              {this._getIconByType(product.productType)}
            </HeaderIconWrapper>
            <HeaderTitle className="esp__cabinet__products__header-title">{product.name}</HeaderTitle>
          </HeaderWrapper>
          <BodyWrapper className="esp__cabinet__products__body-wrapper">
            {product.description}
            <br />
            <Link href={product.infoUrl}>Подробнее</Link>
          </BodyWrapper>
          <FooterWrapper className="esp__cabinet__products__footer-wrapper">
            <Button onClick={() => this._handlerProductClick(product.loginUrl)}>
              {this._getButtonTextByType(product.productState)}
            </Button>
          </FooterWrapper>
        </ItemContent>
      </ItemWrapper>
    );
  };

  _renderProductList() {
    const { products } = this.state;

    return products.map(this._renderProductTemplate);
  }

  render() {
    const { isLoading } = this.state;

    return isLoading ? (
      <Loader />
    ) : (
      <PageWrapper className="esp__cabinet__products">{this._renderProductList()}</PageWrapper>
    );
  }
}

export default ProductsPage;
