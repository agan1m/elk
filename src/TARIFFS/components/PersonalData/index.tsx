'use strict';


import { h, Component } from 'preact';
import { PersonalDataAlertWrapper, PersonalDataParagraphWrapper } from './Wrappers';
import Link from './../../../components/_common/Link';
import { Modal } from './../../../components/_common/ModalDialog';

interface IProps {
  textButton: string;
}

interface IState {
  showModal: boolean;
}

export default class PersonalDataAlert extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { showModal: false };
  }

  _openModalPolicy = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { textButton } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        <PersonalDataAlertWrapper>
          Нажимая кнопку «{textButton}»‎, я выражаю свое{' '}
          <Link target="_blank" border="1px dashed;" onClick={this._openModalPolicy}>
            согласие на обработку ООО «Такском» моих персональных данных
          </Link>{' '}
          в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ «О персональных данных» и{' '}
          <Link href="http://taxcom.ru/upload/documents/policy.pdf" target="_blank">
            Политикой обработки Персональных данных ООО «Такском»‎
          </Link>
        </PersonalDataAlertWrapper>
        <Modal
          open={showModal}
          headerText="Политика обработки Персональных данных ООО «Такском»"
          onClose={this._openModalPolicy}
        >
          <PersonalDataParagraphWrapper>
            Настоящим я выражаю согласие на обработку своих персональных данных ООО «Такском», запись, накопление,
            хранение, уточнение (обновление, изменение) извлечение, использование, передачу (распространение,
            предоставление, доступ), обезличивание, уничтожение). Персональные данные, на обработку которых дается
            согласие в целях исполнения договора, предусматривающего оказание услуг аккредитованного удостоверяющего
            центра в соответствии с федеральным законом от 06.04.2008 №63-ФЗ «Об электронной подписи» (далее ФЗ «Об
            электронной подписи») и федеральным законом от 27.07.2006 №152 «О персональных данных» для изготовления
            квалифицированных сертификатов: фамилия, имя, отчество, ИНН, СНИЛС, место работы (организация),
            подразделение, должность, адрес места жительства, адрес электронной почты, пол, абонентский номер
            (телефона), паспортные данные (серия и номер, код подразделения, место и дата рождения, дата выдачи
            паспорта, адрес регистрации).
          </PersonalDataParagraphWrapper>
          <PersonalDataParagraphWrapper>
            Соглашаюсь с указанием своих персональных данных согласно приказу Минкомсвязи РФ от 250 в реестре выданных
            ООО «Такском» квалифицированных сертификатов, при этом признаю, что в соответствии с п. 3 ст. 15 ФЗ «Об
            электронной подписи» ООО «Такском» обязан обеспечить любому лицу безвозмездный доступ к реестру
            квалифицированных сертификатов ООО «Такском».
          </PersonalDataParagraphWrapper>
          <PersonalDataParagraphWrapper>
            Соглашаюсь с передачей своих персональных данных в Единую систему идентификации и аутентификации в целях
            обеспечения требования ч. 5 ст. 18 ФЗ «Об электронной подписи».
          </PersonalDataParagraphWrapper>
        </Modal>
      </div>
    );
  }
}
