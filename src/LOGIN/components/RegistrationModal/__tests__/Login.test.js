import { h } from 'preact';
import { shallow } from 'enzyme';

import LoginComponent from '../LoginComponent';

const successState = {
  email: 'test@test.ru',
  password: 'test',
  formValidate: { email: true, password: true },
  hasError: false,
  disabled: false,
  error: '',
};
const responseData = {
  TokenInfo: {
    access_token: 'KygMQvpWlkmD_LD2UPsVjpEHH4BxAopLh328ntbCGEE',
    token_type: null,
    expires_in: null,
    refresh_token: null,
  },
  AbonentInfo: {
    ShortName: 'ООО ЧОП "УВО "РОМБ"',
    Inn: '6671356655',
    Kpp: '667101001',
    LegalAddress: '620144,СВЕРДЛОВСКАЯ обл,,г ЕКАТЕРИНБУРГ,,ул ФРУНЗЕ,62,,,196',
    PostAddress: '620144,СВЕРДЛОВСКАЯ обл,,г ЕКАТЕРИНБУРГ,,ул ФРУНЗЕ,62,,,196',
    FactAddress: '620144,СВЕРДЛОВСКАЯ обл,,г ЕКАТЕРИНБУРГ,,ул ФРУНЗЕ,62,,,196',
    Email: 'testtaxcom1112@yopmail.com',
    Boss: {
      Id: 10731,
      LastName: 'КУЛИШОВ',
      FirstName: 'ПАВЕЛ',
      MiddleName: 'ПЕТРОВИЧ',
      Post: 'ДИРЕКТОР',
      Reason: 'Не указано',
      Phone: '1313131313',
      AdditionalPhone: null,
      Fax: null,
      Email: '99461133@yopmail.com',
      FullName: 'КУЛИШОВ ПАВЕЛ ПЕТРОВИЧ',
      BeautifulPhone: '+7 (131) 313-13-13',
    },
    Contact: {
      Id: 0,
      LastName: null,
      FirstName: null,
      MiddleName: null,
      Post: null,
      Reason: null,
      Phone: null,
      AdditionalPhone: null,
      Fax: null,
      Email: null,
      FullName: '  ',
      BeautifulPhone: null,
    },
    Thumbprint: null,
    SignedAbonent: false,
  },
};

describe('LoginComponent', () => {
  const wrapper = shallow(<LoginComponent />);
  const inputs = wrapper.find('.esp__auth__form__input');
  const btn = wrapper.find('.esp__auth__form__button');

  it('should render 2 input', function() {
    expect(inputs).toHaveLength(2);
  });

  it('test email input', () => {
    const formValid = {
      email: true,
      password: false,
    };

    inputs.first().invoke('onChange')('test', false, 'email');

    expect(wrapper.state('email')).toBe('test');
    expect(wrapper.state('formValidate')).toEqual(formValid);
    expect(btn.prop('disabled')).toBe(true);
  });

  it('test password input', () => {
    const formValid = {
      email: true,
      password: true,
    };

    inputs.last().invoke('onChange')('test', false, 'password');

    expect(wrapper.state('password')).toBe('test');
    expect(wrapper.state('formValidate')).toEqual(formValid);
    expect(wrapper.state('hasError')).toBe(false);
  });
});

describe('Login Button', () => {
  const wrapper = shallow(<LoginComponent />);

  it('should be disabled', () => {
    const button = wrapper.find('.esp__auth__form__button');

    expect(button.prop('disabled')).toBe(true);
  });

  it('should be enabled', () => {
    wrapper.setState(successState);
    wrapper.update();
    const button = wrapper.find('.esp__auth__form__button');

    expect(button.prop('disabled')).toBe(false);
  });
});

describe('fetch Login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('call login method', done => {
    const wrapper = shallow(<LoginComponent />);
    const spy = jest.spyOn(wrapper.instance(), '_onLogin');

    wrapper.setState(successState);

    const button = wrapper.find('.esp__auth__form__button');

    button.prop('onClick')();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    done();
  });

  it('test fetch login success with error', done => {
    const wrapper = shallow(<LoginComponent />);
    const error = new Error('error');

    expect(() => wrapper.instance()._requestSuccess({ Error: 'error' })).toThrow(error);
    done();
  });

  it('test fetch login success', done => {
    const mock = jest.fn();
    const wrapper = shallow(<LoginComponent onLogIn={mock} />);

    wrapper.instance()._requestSuccess(responseData);

    expect(wrapper.state('disabled')).toBe(false);
    expect(mock).toHaveBeenCalled();
    done();
  });

  it('fetch login failure', done => {
    const wrapper = shallow(<LoginComponent />);
    const error = new Error('error');

    wrapper.instance()._requestFailure(error);

    expect(wrapper.state('error')).toBe('error');
    expect(wrapper.find('.esp__auth__form__error')).toHaveLength(1);
    done();
  });
});
