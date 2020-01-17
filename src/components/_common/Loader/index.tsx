import { h, Component } from 'preact';

import { SpinnerWrapper } from './Wrappers';

class Loader extends Component<any, any> {
  render() {
    return <SpinnerWrapper className="esp__spinner" />;
  }
}

export default Loader;
