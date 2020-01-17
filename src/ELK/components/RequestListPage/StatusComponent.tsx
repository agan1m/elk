import { h, Component } from 'preact';
import ProgressBar from '../../../components/_common/ProgressBar';
import { StatusIcon, StatusContainer, PayedIcon } from './Wrappers';
import RubleIcon from '../../../components/Icons/RubleIcon';
import colors from '../../../theme/colors';
import { STATUSES } from '../../constants';
import Tooltip from '../../../components/_common/Tooltip';
interface IProps {
  progress?: number;
  status?: number;
}

class StatusComponent extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { progress, status } = this.props;

    return (
      <Tooltip isHovered message={STATUSES[status]}>
        <StatusContainer className="esp__cabinet__request-list__cell-status">
          <StatusIcon className="esp__cabinet__request-list__cell-status-icon" status={status} progress={progress} />
          <ProgressBar status={status} progress={progress} />
          <PayedIcon className="esp__cabinet__request-list__cell-status-payed-icon">
            <RubleIcon
              className="esp__cabinet__request-list__cell-status-ruble-icon"
              color={status > 4 && status < 8 ? colors.green : ''}
              width={15}
              height={15}
            />
          </PayedIcon>
        </StatusContainer>
      </Tooltip>
    );
  }
}

export default StatusComponent;
