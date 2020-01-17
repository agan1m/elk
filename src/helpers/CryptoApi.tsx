declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    chrome: any;
    ttc: {};
    cryptoAxNativeInvoker: any;
  }
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface HTMLObjectElement {
    universalMethod: (arg0: string, arg1: (data: any) => void) => any;
  }
}

((ttc: any) => {
  ttc.crypto = ttc.crypto || {};

  ttc.crypto.operaPluginId = 'hgbahcihohhnedkodchkcmcoeaebelmn';
  ttc.crypto.chromePluginUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://chrome.google.com/webstore/detail/dlagkjochbkkfmcgofjlipnjneahkfjn'
      : 'https://chrome.google.com/webstore/detail/icmedinlhlpbcilepnklnhfgfafcpngc';
  ttc.crypto.chromePluginId =
    process.env.NODE_ENV === 'production' ? 'dlagkjochbkkfmcgofjlipnjneahkfjn' : 'icmedinlhlpbcilepnklnhfgfafcpngc';
  ttc.crypto.firefoxAddonUrl =
    'https://files.taxcom.ru/files/mozilla/com.taxcom.crypto_ax.add-on-1.0.0.1-an+fx-windows.xpi';
  ttc.crypto.firefoxAddonHash = 'sha256:0d98b3eda47f9d71e1fa2f267a0485b9f20bed2fef59ed2f2ffd93b530991654';
})((window.ttc = window.ttc || {}));

export default class CryptoAPI {
  _encryptor: any;
  _settings: {
    ieObjectName?: string;
    ieObjectValue?: string;
    npObjectName?: string;
    npObjectValue?: string;
    operaPluginId?: any;
    chromePluginUrl?: any;
    chromePluginId?: any;
    firefoxAddonUrl?: any;
    firefoxAddonHash?: any;
  };

  constructor() {
    this._encryptor;

    this._setSettings();
  }

  getVersion(callback: any) {
    this._encryptorMethodCall('GetVersion', {}, (cryptoError: any, data: any) => {
      callback(cryptoError, data);
    });
  }

  getCSPVersion(callback: any) {
    this._encryptorMethodCall('GetCSPVersion', {}, (cryptoError: any, data: any) => {
      callback(cryptoError, data);
    });
  }

  getAllCertificatesFromStore(storeName: any, callback: any) {
    this._encryptorMethodCall(
      'GetCertificatesFromStore',
      {
        storeName: storeName,
      },
      (cryptoError: any, data: any) => {
        callback(cryptoError, data);
      },
    );
  }

  performSignByHash(content: any, certificateThumbprint: any, callback: any) {
    this._encryptorMethodCall(
      'MrSignByHash',
      {
        content: content,
        cert_thumb: certificateThumbprint,
      },
      (err: any, data: any) => {
        callback(err, data);
      },
    );
  }

  performSign(content: any, certificateThumbprint: any, callback: any) {
    this._encryptorMethodCall(
      'MrSign',
      {
        content: content,
        cert_thumb: certificateThumbprint,
      },
      (err: any, data: any) => {
        callback(err, data);
      },
    );
  }

  getCertificateFromStore(thumbPrint: any, storeName: any, callback: any) {
    this._encryptorMethodCall(
      'MrGetCertificate',
      {
        thumbPrint: thumbPrint,
        storeName: storeName,
        checkChainFlag: false,
        checkCRLFlag: false,
      },
      (cryptoError: any, data: any) => {
        callback(cryptoError, data);
      },
    );
  }

  getCertificateType(certBody: any, callback: any) {
    this._encryptorMethodCall(
      'GetCertificateType',
      {
        cert: certBody,
      },
      (cryptoError: any, data: any) => {
        callback(cryptoError, data);
      },
    );
  }

  addCertificateInStore(certificateBodyInBase64: any, storeName: any, callback: any) {
    this._encryptorMethodCall(
      'AddCertToStore',
      {
        content: certificateBodyInBase64,
        storeName: storeName,
        checkChainFlag: false,
        checkCRLFlag: false,
      },
      (cryptoError: any, data: any) => {
        callback(cryptoError, data);
      },
    );
  }

  _getEncryptor(methodCallCallback: any) {
    if (this._encryptor) {
      methodCallCallback(null, this._encryptor);
      return;
    }

    // IE
    if ('ActiveXObject' in window) {
      const encryptorAX = this._createObject([
        {
          name: this._getSetting('ieObjectName'),
          value: this._getSetting('ieObjectValue'),
        },
      ]);

      if (Object.prototype.hasOwnProperty.call(encryptorAX, 'UniversalMethod')) {
        this._encryptor = {
          universalMethod: (args: any, callback: any) => {
            encryptorAX.universalMethod(JSON.stringify(args), data => {
              callback(JSON.parse(data));
            });
          },
        };
        methodCallCallback(null, this._encryptor);
        return;
      }
    }
    // IE end

    // NAVIGATOR
    if (window.navigator && window.navigator.plugins) {
      for (let i = 0; i < window.navigator.plugins.length; i++) {
        if (window.navigator.plugins[i].name.indexOf('Taxcom CryptoAX') >= 0) {
          const encryptorNp = this._createObject([
            {
              name: this._getSetting('npObjectName'),
              value: this._getSetting('npObjectValue'),
            },
          ]);

          this._encryptor = {
            universalMethod: (args: any, callback: any) => {
              encryptorNp.universalMethod(JSON.stringify(args), data => {
                callback(JSON.parse(data));
              });
            },
          };
          methodCallCallback(null, this._encryptor);
          return;
        }
      }
    }

    //FireFox
    if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
      try {
        this._encryptor = {
          universalMethod: (args: any, callbackInner: any) => {
            let attemptСount = 0;

            const maxAttemptCount = 30;

            const timerInterval = 100;

            const timerId = window.setInterval(() => {
              if (window.cryptoAxNativeInvoker) {
                window.clearInterval(timerId);
                window.cryptoAxNativeInvoker.sendNativeMessage(args, (content: any) => {
                  callbackInner(content.data);
                });
              } else {
                if (attemptСount++ > maxAttemptCount) {
                  window.clearInterval(timerId);
                  methodCallCallback(new Error('BrowserExtNotInstalledError'));
                }
              }
            }, timerInterval);
          },
        };

        methodCallCallback(null, this._encryptor);
      } catch (error) {
        methodCallCallback(new Error('BrowserExtNotInstalledError'));
      }

      return;
    }
    // NAVIGATOR end

    // CHROME
    if ('chrome' in window) {
      // расширение
      let certEnrollExtensionId = this._getSetting('operaPluginId');

      const navigatorVar: any = window.navigator || {};

      if (navigatorVar.userAgent.indexOf('OPR/') === -1) {
        certEnrollExtensionId = this._getSetting('chromePluginId');
      }

      const callChromiumExt = (args: any, chroniumCallback: any) => {
        if (!window.chrome.runtime) {
          chroniumCallback(null);
          return;
        }

        window.chrome.runtime.sendMessage(certEnrollExtensionId, args, (response: any) => {
          if (!response) {
            chroniumCallback(null);
            return;
          }
          chroniumCallback(response.data);
        });
      };

      callChromiumExt(
        {
          methodName: 'GetExtVersion',
        },
        (data: any) => {
          if (data) {
            this._encryptor = {
              universalMethod: (args: any, callback: any) => {
                callChromiumExt(args, callback);
              },
            };
            methodCallCallback(null, this._encryptor);
            return;
          }
          methodCallCallback(new Error('BrowserExtNotInstalledError'));
        },
      );
    }
    // CHROME end

    // no one api
    else {
      methodCallCallback(new Error('PluginNotInstalledError'));
    }
  }

  _encryptorMethodCall(methodName: any, methodArgs: any, externalCallback: any) {
    this._getEncryptor((encryptorErr: any, encryptor: any) => {
      if (encryptorErr) {
        externalCallback(encryptorErr);
        return;
      }
      const args = methodArgs || {};

      args.methodName = methodName;
      args.checkChainFlag = args.checkChainFlag === undefined ? true : args.checkChainFlag;
      args.checkCRLFlag = args.checkCRLFlag === undefined ? true : args.checkCRLFlag;
      args.storeName = args.storeName || 'MY';

      encryptor.universalMethod(args, (result: any) => this._handlerEncryptorMethod(result, externalCallback));
    });
  }

  _handlerEncryptorMethod(result: any, externalCallback: any) {
    if ('error' in result) {
      let resultError = null;

      switch (result.number) {
        case -2147467262:
        case -2147467263:
          resultError = new Error('ContractViolationError');
          break;
        case -2147467259:
          switch (result.error) {
            case 'Не обнаружен крипто-провайдер Крипто-Про.':
              resultError = new Error('CryptoProNotInstalledError');
              break;
            default:
              resultError = new Error(result.error);
          }
          break;
        default:
          switch (result.error) {
            case 'Specified native messaging host not found.':
              resultError = new Error('PluginNotInstalledError');
              break;
            default:
              resultError = new Error(result.error);
              break;
          }
      }
      externalCallback(resultError);
      return;
    }

    externalCallback(null, result);
  }

  _setSettings() {
    const ttc: any = window.ttc;
    const crypto: any = ttc.crypto || {};

    this._settings = {
      ieObjectName: 'classid',
      ieObjectValue: 'CLSID:CF00C50D-F95A-46F9-9986-F45E38A9B1B1',

      npObjectName: 'type',
      npObjectValue: 'application/x-taxcomCryptoAX',

      operaPluginId: crypto.operaPluginId || '',
      chromePluginUrl: crypto.chromePluginUrl || '',
      chromePluginId: crypto.chromePluginId || '',
      firefoxAddonUrl: crypto.firefoxAddonUrl || '',
      firefoxAddonHash: crypto.firefoxAddonHash || '',
    };
  }

  _getSetting(settingKey: any) {
    return this._settings[settingKey] || '';
  }

  _createObject(attributes: any) {
    const object = document.createElement('object');

    object.setAttribute('width', '0');
    object.setAttribute('height', '0');
    object.setAttribute('id', 'taxcomEncryptor');
    for (let i = 0; i < attributes.length; i++) {
      object.setAttribute(attributes[i].name, attributes[i].value);
    }
    document.body.appendChild(object);
    return object;
  }
}
