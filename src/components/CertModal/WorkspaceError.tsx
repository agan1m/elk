import { h } from 'preact';
import { WrapperError } from './Wrappers';
import { IErrorProps } from './Interfaces';

import Button from '../_common/Button';
import ComputerIcon from '../Icons/ComputerIcon';

const WorkplaceError = (props: IErrorProps) => {
  const { error } = props;

  if (!error) {
    return null;
  }

  let message = '';

  switch (error) {
    case 'BrowserExtNotInstalledError':
    case 'PluginNotInstalledError':
    case 'PluginNotInstalled':
      message = 'Не установлен модуль криптографии «Такском-Сертификаты»';
      break;
    case 'ContractViolationError':
      message = 'Устарела версия модуля криптографии «Такском-Сертификаты»';
      break;
    case 'CryptoProNotInstalledError':
    case 'Не обнаружен крипто-провайдер Крипто-Про.':
      message = 'Не обнаружен криптопровайдер «Крипто-Про».';
      break;
    case 'CryptoNoRootError':
      message = 'Не найдено ни одного цифрового сертификата, необходимого для входа в систему';
      break;
    case 'Failed to fetch':
      message = 'Нет соединения с сетью';
      break;
    case 'CryptoSelectError':
    case 'CryptoCspExpired':
    case 'CryptoDefaultError':
    default:
      break;
  }

  return (
    <WrapperError className="esp__cert-modal__error">
      <ComputerIcon />
      <p>Рабочее место не настроено</p>
      <p style={{ fontSize: 15 }}>{message || error}</p>
      <Button
        primary
        href="http://fwlink.taxcom.ru/ShowContents.aspx?ContentId=234"
        target="_blank"
        rel="nofollow noopener"
        margin="30px 0;"
      >
        Настроить
      </Button>
    </WrapperError>
  );
};

export default WorkplaceError;
