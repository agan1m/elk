import { h, Component } from 'preact';
import { Redirect, Route } from 'react-router-dom';
import CookieUtil from '../../helpers/CookieUtil';

interface IProps {
  component: any;
  exact?: boolean;
  path: string;
}

class ProtectedRoute extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props: any) =>
          CookieUtil.getToken() ? (
            <Component {...props} />
          ) : (
            <Redirect
              push
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

export default ProtectedRoute;
