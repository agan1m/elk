import { h, Component } from 'preact';
import { Redirect, Route } from 'react-router-dom';
import CookieUtil from '../../helpers/CookieUtil';

interface IProps {
  component: any;
  exact?: boolean;
  path: string;
}

class AuthRoute extends Component<IProps, any> {
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
            <Redirect
              to={{
                pathname: '/requests',
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  }
}

export default AuthRoute;
