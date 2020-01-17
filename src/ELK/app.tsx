import { h, Component } from 'preact';
import { injectGlobal } from 'styled-components';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import ProtectedRoute from '../components/Route/ProtectRoute';
import AuthRoute from '../components/Route/AuthRoute';
import { resetCSS } from '../reset';
import Sidebar from './components/Sidebar';

import RequestPage from './components/RequestPage';
import RequestListPage from './components/RequestListPage';
import ProductsPage from './components/ProductsPage';
import LoginPage from './components/LoginPage';
import ResetPage from './components/ResetPage';
import RestorePage from './components/ResetPage/RestorePage';

import { PageLayout, ElkPageLayout, Layout } from '../components/_common/layout/Wrapper';
import { setAuthToken } from '../LOGIN/services';
import CookieUtil from '../helpers/CookieUtil';

interface IState {
  page: string;
}

injectGlobal`
    ${resetCSS()}
`;

class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      page: 'request',
    };

    this._reverData();
  }

  componentDidMount() {
    window.addEventListener('elk_auth', this._handlerEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('elk_auth', this._handlerEvent);
  }

  _handlerEvent = ({ detail = '' }: CustomEvent) => this._reverData(detail);

  _reverData = async (token?: string) => {
    if (!token) {
      token = CookieUtil.getCookie('Token');
    }

    setAuthToken(token);
  };

  render() {
    return (
      <HashRouter>
        <Layout className="esp__cabinet__layout">
          <PageLayout className="esp__cabinet__page-layout">
            {CookieUtil.getToken() ? <Sidebar /> : null}
            <ElkPageLayout>
              <Switch>
                <ProtectedRoute exact path="/requests/:requestId" component={RequestPage} />
                <ProtectedRoute exact path="/requests" component={RequestListPage} />
                <ProtectedRoute exact path="/products" component={ProductsPage} />
                <AuthRoute exact path="/login" component={LoginPage} />
                <Route exact path="/resetpassword" component={ResetPage} />
                <Route exact path="/restorepassword" component={RestorePage} />
                <Redirect push to="/requests" />
              </Switch>
            </ElkPageLayout>
          </PageLayout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
