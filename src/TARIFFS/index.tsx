import { h, render } from 'preact';
import { ThemeProvider } from 'styled-components';
import { Provider } from './context';
import App from './app';
import { TYPE } from './../constants';
import { getColorsByType, IColors } from './../theme/colors';

const createApp = (container: string, { regionCode, productType, utm }) => {
  const theme: IColors = getColorsByType(productType);

  render(
    <Provider value={{ type: productType }}>
      <ThemeProvider theme={theme}>
        <App regionCode={regionCode} productType={productType} utm={utm} />
      </ThemeProvider>
    </Provider>,
    document.getElementById(container),
  );
};

if (process.env.NODE_ENV === 'development') {
  createApp('root', { regionCode: 77, productType: TYPE.EDO, utm: null });
}

export { createApp };
