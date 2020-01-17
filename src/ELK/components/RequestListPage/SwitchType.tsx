import { h, Component } from 'preact';
import ReportingIcon from '../../../components/Icons/ReportingIcon';
import OfdIcon from '../../../components/Icons/OfdIcon';
import UcIcon from '../../../components/Icons/UcIcon';
import VetisIcon from '../../../components/Icons/VetisIcon';
import DossierIcon from '../../../components/Icons/DossierIcon';
import EdoIcon from '../../../components/Icons/EdoIcon';
import { RequestTypeWrapper, RequestTypeText } from './Wrappers';

interface IProps {
  requestType?: number;
  width?: number;
  height?: number;
  style?: Record<string, any>;
}

class SwitchTypeComponent extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { requestType, width, height, style } = this.props;

    switch (requestType) {
      case 1:
        return (
          <RequestTypeWrapper className="esp__cabinet__request-list-request-type">
            <ReportingIcon
              className="esp__cabinet__request-list-request-type-icon"
              width={width || 20}
              height={height || 20}
              style={style}
            />
            <RequestTypeText className="esp__cabinet__request-list-request-type-text">Отчетность</RequestTypeText>
          </RequestTypeWrapper>
        );
      case 2:
        return (
          <RequestTypeWrapper className="esp__cabinet__request-list-request-type">
            <EdoIcon
              className="esp__cabinet__request-list-request-type-icon"
              width={width || 20}
              height={height || 20}
              style={style}
            />
            <RequestTypeText className="esp__cabinet__request-list-request-type-text">Файлер</RequestTypeText>
          </RequestTypeWrapper>
        );
      case 3:
        return (
          <RequestTypeWrapper className="esp__cabinet__request-list-request-type">
            <UcIcon
              className="esp__cabinet__request-list-request-type-icon"
              width={width || 20}
              height={height || 20}
              style={style}
            />
            <RequestTypeText className="esp__cabinet__request-list-request-type-text">Услуги УЦ</RequestTypeText>
          </RequestTypeWrapper>
        );
      case 4:
        return (
          <RequestTypeWrapper className="esp__cabinet__request-list-request-type">
            <OfdIcon
              className="esp__cabinet__request-list-request-type-icon"
              width={width || 20}
              height={height || 20}
              style={style}
            />
            <RequestTypeText className="esp__cabinet__request-list-request-type-text">ОФД</RequestTypeText>
          </RequestTypeWrapper>
        );
      case 5:
        return (
          <RequestTypeWrapper className="esp__cabinet__request-list-request-type">
            <VetisIcon
              className="esp__cabinet__request-list-request-type-icon"
              width={width || 20}
              height={height || 20}
              style={style}
            />
            <RequestTypeText className="esp__cabinet__request-list-request-type-text">Ветис</RequestTypeText>
          </RequestTypeWrapper>
        );
      case 6:
        return (
          <RequestTypeWrapper className="esp__cabinet__request-list-request-type">
            <DossierIcon
              className="esp__cabinet__request-list-request-type-icon"
              width={width || 20}
              height={height || 20}
            />
            <RequestTypeText className="esp__cabinet__request-list-request-type-text">Досье</RequestTypeText>
          </RequestTypeWrapper>
        );
      default:
        break;
    }
  }
}

export default SwitchTypeComponent;
