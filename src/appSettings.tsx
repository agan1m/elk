class AppSettings {
  static getBaseUrl() {
    const protocol = window.location.protocol;
    let API_URL: string;

    if (process.env.NODE_ENV === 'production' && process.env.PROJECT_ENV === 'prod') {
      API_URL = 'https://api-elk.taxcom.ru/elkapi/';
    } else if (process.env.NODE_ENV === 'production' && protocol === 'https:') {
      API_URL = 'https://stage-elk-api.taxcom.ru/elkapi/';
    } else if (process.env.NODE_ENV === 'production' && protocol === 'http:') {
      API_URL = 'http://stage-elk.tst.loc:8108/elkapi/';
    } else {
      // API_URL = 'http://ladoga.tst.loc:8108/elkapi/';
      // API_URL = 'http://stage-elk.tst.loc:8108/elkapi/';
      API_URL = 'https://stage-elk-api.taxcom.ru/elkapi/';
      // API_URL = 'http://localhost:3000/';
    }
    return API_URL;
  }

  static DELAY_INTERVAL = 60000;
}

export default AppSettings;
