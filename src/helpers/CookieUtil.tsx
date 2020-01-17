class Cookie {
  static getCookie = (name: string) => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)'),
    );

    if (matches) {
      const value = decodeURIComponent(matches[1]);

      if (value === 'undefined' || !value) {
        return null;
      }
    }
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
  static setCookie = (name: string, value: any, options?: any) => {
    options = options || {};

    let expires = options.expiresIn || options.expires_in;

    if (typeof expires === 'number' && expires) {
      const d = new Date();

      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;

    for (const propName in options) {
      if (options.hasOwnProperty(propName)) {
        updatedCookie += '; ' + propName;

        const propValue = options[propName];

        if (propValue !== true) {
          updatedCookie += '=' + propValue;
        }
      }
    }
    updatedCookie += ';path=/';
    document.cookie = updatedCookie;
  };

  static deleteCookie = (name: string) => {
    Cookie.setCookie(name, '', {
      'max-age': -1,
    });
  };

  static setToken = (value: any, options?: any) => {
    options = options || {};

    let expires = options.expires_in || options.expiresIn;

    if (typeof expires === 'number' && expires) {
      const d = new Date();

      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = 'Token=' + value;

    for (const propName in options) {
      if (options.hasOwnProperty(propName)) {
        updatedCookie += '; ' + propName;

        const propValue = options[propName];

        if (propValue !== true) {
          updatedCookie += '=' + propValue;
        }
      }
    }
    updatedCookie += ';path=/';
    document.cookie = updatedCookie;
  };

  static getToken = () => {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + 'Token'.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)'),
    );

    if (matches) {
      const value = decodeURIComponent(matches[1]);

      if (value === 'undefined' || !value) {
        return null;
      }
    }
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
}

export default Cookie;
