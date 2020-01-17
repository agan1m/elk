import { h, Component } from 'preact';
import { CertInn, CertItem, CertLeftCell, CertOrgName, CertRightCell, CertTable, ErrorText } from './Wrappers';
import { IListProps, ICert } from './Interfaces';

class CertList extends Component<IListProps> {
  _selectCert = (cert: ICert, ind: number) => {
    const { onSelect } = this.props;

    onSelect && onSelect(cert, ind);
  };

  _getDateByFloat(floatNum: any, toString = false) {
    if (!floatNum) {
      return null;
    }

    const parts = ('' + floatNum).split('.');

    if (parts.length > 0 && parts[0]) {
      const date = new Date(1899, 11, 30);

      date.setDate(date.getDate() + parseInt(parts[0], 10));

      const newDate = new Date(date);

      return toString ? this._dateToString(newDate) : newDate;
    }

    return null;
  }

  _dateToString(date: any) {
    const day = '' + date.getDate();
    const month = '' + (date.getMonth() + 1);
    const year = '' + date.getFullYear();

    return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
  }

  render() {
    const { certs = [], errorInd, errorMsg } = this.props;

    return (
      <CertTable className="esp__cert-modal__list">
        <tbody>
          {certs.map((cert: ICert, ind) => (
            <CertItem key={ind} className="esp__cert-modal__item" onClick={() => this._selectCert(cert, ind)}>
              <CertLeftCell className="esp__cert-modal__left-cell">
                <CertOrgName className="esp__cert-modal__org-name" title={cert.o}>
                  {cert.o}
                  {cert.isFL63Cert ? '' : <span className="FL63warning"> Не соответствует 63-ФЗ</span>}
                </CertOrgName>
                <br />
                <span>{cert.cn}</span>
                {errorInd === ind && errorMsg ? <ErrorText>{errorMsg}</ErrorText> : null}
              </CertLeftCell>
              <CertRightCell className="esp__cert-modal__right-cell">
                <CertInn className="esp__cert-modal__inn">
                  {cert.inn ? `ИНН ${cert.inn}` : ''}
                  {cert.kpp ? `/ ${cert.kpp}` : ''}
                </CertInn>
                <p>Действует до {this._getDateByFloat(cert.notAfter, true)}</p>
              </CertRightCell>
            </CertItem>
          ))}
        </tbody>
      </CertTable>
    );
  }
}

export default CertList;
