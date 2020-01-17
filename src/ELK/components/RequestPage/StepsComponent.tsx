import { h, Component } from 'preact';
import Tooltip from '../../../components/_common/Tooltip';
import DownloadIcon from '../../../components/Icons/DownloadIcon';
import {
  StepsWrapper,
  StepsList,
  StepsListItem,
  StepsListItemContent,
  PaymentList,
  PaymentListItem,
  PaymentButtons,
  RequestLink,
  DocsContainer,
  ButtonWrapper,
  SpoilerWrapper,
} from './Wrappers';
import Link from '../../../components/_common/Link';
import Spoiler from '../../../components/_common/Spoiler';

interface IProps {
  step: number;
  documents: any;
  usedCert: boolean;
  paymentLink: string;
}
interface IState {
  isSpoilerOpen: boolean;
}

class StepsComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isSpoilerOpen: false,
    };
  }

  _calcStep = (step: number) => {
    switch (step) {
      case 1:
      case 2:
      case 3:
      case 4:
        return 1;
      case 5:
        return 2;
      case 6:
        return 3;
      case 7:
        return 4;
      case 8:
      case 9:
        return 0;
      default:
        return 1;
    }
  };

  _spoilerToggle = () => {
    const { isSpoilerOpen } = this.state;

    this.setState({ isSpoilerOpen: !isSpoilerOpen });
  };

  render() {
    const { step, documents, usedCert, paymentLink } = this.props;
    const { isSpoilerOpen } = this.state;
    const {
      serviceApplication = {},
      skpepDoc = {},
      poLicenseDoc = {},
      additionalProductDoc = {},
      docsFrom1C = {},
      epSupportingInfo = {},
      docUc = {},
      bills = {},
      fileStorageDoc1 = {},
    } = documents;
    const styleIndentLeft = { marginLeft: 8 };
    const styleIndent = { marginLeft: 8, marginRight: 8 };
    const calcStep = this._calcStep(step);

    return (
      <StepsWrapper className="cabinet__request__steps__container">
        <StepsList className="cabinet__request__steps__list">
          <StepsListItem className="cabinet__request__steps__list__item" step={calcStep} currentStep={1}>
            <StepsListItemContent className="cabinet__request__steps__list__item__content">
              <h4 className="cabinet__request__steps__list__item__title">Оплата счета</h4>
              <div>
                <PaymentList className="cabinet__request__steps__payment-list">
                  <PaymentListItem className="cabinet__request__steps__payment-list__item">
                    по выставленному счету (получение оплаты через неделю)
                  </PaymentListItem>
                  <PaymentListItem className="cabinet__request__steps__payment-list__item">
                    наличными через банк (получение оплаты через 3-5 рабочих дней)
                  </PaymentListItem>
                  <PaymentListItem className="cabinet__request__steps__payment-list__item">
                    банковской картой (для моментального получения оплаты)
                  </PaymentListItem>
                </PaymentList>
                <PaymentButtons className="cabinet__request__steps__payment-button-container">
                  <ButtonWrapper
                    disabled={calcStep < 1 || (!bills || (bills && !bills.link))}
                    target="_blank"
                    href={bills.link}
                    className="cabinet__request__steps__payment-btn"
                  >
                    Скачать счета
                  </ButtonWrapper>
                  <ButtonWrapper
                    className="cabinet__request__steps__payment-btn"
                    href={paymentLink}
                    disabled={calcStep < 1 || !paymentLink}
                    primary
                  >
                    Оплатить онлайн
                  </ButtonWrapper>
                </PaymentButtons>
              </div>
            </StepsListItemContent>
          </StepsListItem>
          <StepsListItem className="cabinet__request__steps__list__item" step={calcStep} currentStep={2}>
            <StepsListItemContent className="cabinet__request__steps__list__item__content">
              <h4 className="cabinet__request__steps__list__item__title">
                {usedCert ? 'Получение услуги' : 'Отправьте запрос на сертификат'}
              </h4>
              {usedCert ? (
                <p>
                  После оплаты счета Вы получите Уведомление о регистрации заявления на оказание услуг. С этого момента
                  вы сможете зайти в Онлайн-Спринтер по сертификату ЭП, который был использован при отправке заявки.
                </p>
              ) : (
                <p>
                  По карточке доступа к Удостоверяющему центру запросите сертификат с помощью Мастера выпуска
                  сертификатов.
                </p>
              )}
              <RequestLink className="cabinet__request__steps__request-link-container">
                {usedCert ? (
                  <Link
                    className="cabinet__request__steps__request-link"
                    disabled={!fileStorageDoc1 || (fileStorageDoc1 && !fileStorageDoc1.link)}
                    target="_blank"
                    href={fileStorageDoc1.link}
                  >
                    Уведомление о регистрации ГС
                    <DownloadIcon className="cabinet__request__steps__download-icon" style={styleIndentLeft} />
                  </Link>
                ) : (
                  <Link
                    className="cabinet__request__steps__request-link"
                    disabled={!docUc || (docUc && !docUc.link)}
                    target="_blank"
                    href={docUc.link}
                  >
                    Карточка доступа к УЦ
                    <DownloadIcon className="cabinet__request__steps__download-icon" style={styleIndentLeft} />
                  </Link>
                )}
              </RequestLink>
              <div>
                {usedCert ? (
                  <ButtonWrapper
                    className="cabinet__request__steps__payment-btn"
                    disabled={calcStep < 3 || (!docsFrom1C || (docsFrom1C && !docsFrom1C.link))}
                    target="_blank"
                    href={docsFrom1C.link}
                    primary
                  >
                    Скачать закрывающие документы
                  </ButtonWrapper>
                ) : (
                  <ButtonWrapper
                    className="cabinet__request__steps__payment-btn"
                    disabled={calcStep < 2}
                    target="_blank"
                    href={'https://ce.taxcom.ru/'}
                    primary
                  >
                    Запросить сертификат
                  </ButtonWrapper>
                )}
              </div>
            </StepsListItemContent>
          </StepsListItem>
          {!usedCert ? (
            <StepsListItem className="cabinet__request__steps__list__item" step={calcStep} currentStep={3}>
              <StepsListItemContent className="cabinet__request__steps__list__item__content">
                <h4 className="cabinet__request__steps__list__item__title">Предоставить документы на проверку</h4>
                <p>Распечатайте документы из перечня ниже:</p>
                <RequestLink className="cabinet__request__steps__request-link-container">
                  <Link
                    className="cabinet__request__steps__request-link"
                    disabled={!serviceApplication || (serviceApplication && !serviceApplication.link)}
                    target="_blank"
                    href={serviceApplication.link}
                  >
                    Заявление об оказании услуг
                    <DownloadIcon className="cabinet__request__steps__download-icon" style={styleIndentLeft} />
                  </Link>
                </RequestLink>
                <p>
                  Сделайте копии{' '}
                  <Link className="cabinet__request__steps__request-link" target="_blank" href={epSupportingInfo.link}>
                    документов, подтверждающих сведения, содержащиеся в сертификате ЭП
                  </Link>{' '}
                  и распечатайте Заявление на выдачу сертификата из Мастера выпуска сертификатов. Заверьте полученный
                  пакет документов подписью руководителя и печатью организации, после чего предоставьте его в офис
                  Такском.
                </p>
                <SpoilerWrapper>
                  <Spoiler label="В офис поедет не руководитель?" isOpen={isSpoilerOpen} onClick={this._spoilerToggle}>
                    <p>
                      В случае, приезда в офис Такском не руководителя, Вам понадобится скан паспорта и доверенности:
                    </p>
                    <DocsContainer className="cabinet__request__steps__docs-container">
                      <span>
                        <RequestLink className="cabinet__request__steps__request-link-container">
                          <Link
                            className="cabinet__request__steps__request-link"
                            disabled={!skpepDoc || (skpepDoc && !skpepDoc.link)}
                            target="_blank"
                            href={skpepDoc.link}
                          >
                            На получение СКПЭП
                            <DownloadIcon className="cabinet__request__steps__download-icon" style={styleIndent} />
                          </Link>
                          <Tooltip isHovered message="В случае получения сертификата за другого человека" />
                        </RequestLink>
                      </span>
                      <span>
                        <RequestLink className="cabinet__request__steps__request-link-container">
                          <Link
                            className="cabinet__request__steps__request-link"
                            disabled={!poLicenseDoc || (poLicenseDoc && !poLicenseDoc.link)}
                            target="_blank"
                            href={poLicenseDoc.link}
                          >
                            На получение Лицензий на право использования ПО
                            <DownloadIcon className="cabinet__request__steps__download-icon" style={styleIndent} />
                          </Link>
                          <Tooltip
                            isHovered
                            message="Оформляется на уполномоченного представителя, наделенного правом подписания соответствующих документов, в т.ч. актов при получении прав по лицензионному договору"
                          />
                        </RequestLink>
                      </span>
                      <span>
                        <RequestLink className="cabinet__request__steps__request-link-container">
                          <Link
                            className="cabinet__request__steps__request-link"
                            disabled={!additionalProductDoc || (additionalProductDoc && !additionalProductDoc.link)}
                            target="_blank"
                            href={additionalProductDoc.link}
                          >
                            На получение дополнительных продуктов
                            <DownloadIcon className="cabinet__request__steps__download-icon" style={styleIndent} />
                          </Link>
                          <Tooltip isHovered message="Оформляется на получателя USB-ключа" />
                        </RequestLink>
                      </span>
                    </DocsContainer>
                  </Spoiler>
                </SpoilerWrapper>
                <div>
                  <ButtonWrapper
                    className="cabinet__request__steps__payment-btn"
                    disabled={calcStep < 3 || (!docsFrom1C || (docsFrom1C && !docsFrom1C.link))}
                    target="_blank"
                    href={docsFrom1C.link}
                    primary
                  >
                    Скачать закрывающие документы
                  </ButtonWrapper>
                </div>
              </StepsListItemContent>
            </StepsListItem>
          ) : null}
        </StepsList>
      </StepsWrapper>
    );
  }
}

export default StepsComponent;
