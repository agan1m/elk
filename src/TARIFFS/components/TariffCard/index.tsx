import { h, Component } from 'preact';
import { TYPE } from './../../../constants';

import EdoTariffCard from './Edo';
import ReportsTariffCard from './Reports';
import { IProps, IState } from './Interfaces';

class TariffCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { type } = this.props;

    switch (type) {
      case TYPE.EDO:
        return <EdoTariffCard {...this.props} />;
      case TYPE.REPORTS:
        return <ReportsTariffCard {...this.props} />;
    }
  }
}

export default TariffCard;
