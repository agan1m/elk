const REG_EMAIL = new RegExp('^([A-Za-z0-9_\\-]+\\.)*[A-Za-z0-9_\\-]+@([A-Za-z0-9\\-]*[A-Za-z0-9]\\.)+[A-Za-z]{2,63}$');
const REG_PASSWORD_CHARS = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])[0-9a-zA-Z!@#$&*]{8,}$');
const REG_NUMBER = new RegExp('^[\\d]{1,}$');
const REG_STRING = new RegExp('^[\\w]{1,}$');
const REG_STRING_RUS = new RegExp('^([А-Яа-яЁё]+([\\-\\s]?[А-Яа-яЁё]+)?)*$');
const REG_INN = new RegExp('^([\\d]{10}|[\\d]{12})$');
const REG_KPP = new RegExp('^([0-9]{1}[1-9]{1}|[1-9]{1}[0-9]{1})([0-9]{2})([0-9A-Z]{2})([0-9]{3})$');
const REG_OGRN = new RegExp('^([\\d]{13})$');
const REG_OGRNIP = new RegExp('^([\\d]{15})$');
const REG_PHONE = new RegExp('^\\([\\d]{3}\\)\\s?[\\d]{3}\\-[\\d]{2}\\-[\\d]{2}$');

const ValidateRules = {
  require: function(value: any) {
    const isEmptyObject = value !== null && typeof value === 'object' && Object.keys(value).length === 0;

    return Boolean(value && !isEmptyObject);
  },

  email: function(value: any) {
    return Boolean(REG_EMAIL.test(value));
  },

  password: function(value: any) {
    return Boolean(REG_PASSWORD_CHARS.test(value));
  },

  confirm: function(first: any, second: any) {
    return Boolean(first === second);
  },

  number: function(value: any) {
    return Boolean(REG_NUMBER.test(value));
  },

  string: function(value: any) {
    return Boolean(REG_STRING.test(value));
  },

  stringRus: function(value: any) {
    return Boolean(REG_STRING_RUS.test(value));
  },

  inn: function(value: any) {
    return Boolean(REG_INN.test(value));
  },

  kpp: function(value: any) {
    return Boolean(REG_KPP.test(value));
  },

  ogrn: function(value: any) {
    return Boolean(REG_OGRN.test(value));
  },

  ogrnip: function(value: any) {
    return Boolean(REG_OGRNIP.test(value));
  },

  phone: function(value: any) {
    return Boolean(REG_PHONE.test(value));
  },

  reqExp: function(value: any, rule: any) {
    return rule.test(value);
  },
};

export default ValidateRules;
