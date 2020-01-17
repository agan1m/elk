import { h, render } from 'preact';
import { ThemeProvider } from 'styled-components';
import { getColorsByType, IColors } from './../theme/colors';
import App from './app';

const createApp = (container: string) => {
  const theme: IColors = getColorsByType(0);

  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
    document.getElementById(container),
  );
};

if (process.env.NODE_ENV === 'development') {
  createApp('container2');
}

export { createApp };
