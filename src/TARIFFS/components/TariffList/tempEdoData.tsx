import axios from 'axios';
import { isArray } from 'util';

async function getPriceByRegion(region: number) {
  try {
    const { data } = await axios.get('/_spa_scipts/stocks2.json');

    return region in data ? data[region] : data[0];
  } catch (error) {
    window.console.error(error);
  }
}

function getPrice(tariffId: number, data: any, range = false) {
  const price = data[tariffId];

  const rangeKeys = typeof price === 'object' ? Object.keys(price) : null;

  if (isArray(price) && price.length === 3) {
    return price;
  } else if (range) {
    return rangeKeys ? price : 0;
  } else if (rangeKeys && rangeKeys.length > 3) {
    const basePrice = price[rangeKeys[0]];

    return [basePrice, basePrice, 0];
  }

  return [price, price, 0];
}

const TariffList = async (codeRigion: number) => {
  try {
    const price = await getPriceByRegion(codeRigion);

    return [
      {
        name: 'Входящие',
        sale: getPrice(0, price)[2],
        basePrice: getPrice(0, price)[0],
        price: getPrice(0, price)[1],
        rangePrice: getPrice(0, price, true),
        paymentPeriod: '1 год',
        paymentLabel: '',
        url: 'https://taxcom.ru/upload/tariff/region_77/2019/18042019_77_TP%20Udobnyy.pdf',
        priceTitle: 'Онлайн-Спринтер',
        isRecommended: false,
        isSpecialMode: false,
        necessaryServices: [
          'Безлимитное количество входящих документов',
          'API или приложение Такском-Ассистент для интеграции с учетной системой',
          'Передача информации о маркированном товаре в ЦРПТ',
        ],
        exchangeDirections: [],
        settings: [],
        gko: {
          min: 0,
          max: 3,
        },
        shortDescription: 'Отчеты в ФНС, ПФР, сервисы «Досье», «Сверься!», ЭДО с контрагентами',
        isPromo: false,
      },
      {
        name: 'Входящие с маркировкой',
        sale: getPrice(1, price)[2],
        basePrice: getPrice(1, price)[0],
        price: getPrice(1, price)[1],
        rangePrice: getPrice(1, price, true),
        paymentPeriod: '1 год',
        paymentLabel: '',
        url: 'https://taxcom.ru/upload/tariff/region_77/2019/18042019_77_TP%20Komfortnyy.pdf',
        priceTitle: 'Онлайн-Спринтер',
        isRecommended: false,
        isSpecialMode: false,
        necessaryServices: [
          'Безлимитное количество входящих документов',
          'API или приложение Такском-Ассистент для интеграции с учетной системой',
          'Работа с кодами маркированных товаров',
          'Передача информации о маркированном товаре в ЦРПТ',
        ],
        exchangeDirections: [],
        settings: [],
        gko: {
          min: 0,
          max: 3,
        },
        shortDescription: 'Отчеты в ФНС, ПФР, ФСС, сервисы «Досье», «Сверься!», ЭДО с контрагентами',
        isPromo: false,
      },
      {
        name: 'Исходящие',
        sale: getPrice(2, price)[2],
        basePrice: getPrice(2, price)[0],
        price: getPrice(2, price)[1],
        rangePrice: getPrice(2, price, true),
        paymentPeriod: '1 год',
        paymentLabel: '',
        url: 'https://taxcom.ru/upload/tariff/region_77/2019/18042019_77_TP%20Komfortnyy%20Sp.pdf',
        priceTitle: 'Онлайн-Спринтер',
        isRecommended: false,
        isSpecialMode: false,
        necessaryServices: [
          'Пакет исходящих документов',
          'API или приложение Такском-Ассистент для интеграции с учетной системой',
          'Работа с кодами маркированных товаров',
          'Передача информации о маркированном товаре в ЦРПТ',
        ],
        exchangeDirections: [],
        settings: [],
        gko: {
          min: 0,
          max: 3,
        },
        shortDescription: 'Отчеты в ФНС, ПФР, ФСС, сервисы «Досье», «Сверься!», ЭДО с контрагентами',
        isPromo: false,
      },
    ];
  } catch (error) {
    window.console.error(error);
  }
};

export default TariffList;
