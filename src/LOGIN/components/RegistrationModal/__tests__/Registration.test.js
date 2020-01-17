import { h } from 'preact';
import { shallow } from 'enzyme';

import RegistrationComponent from '../RegistrationComponent';
import Autocomplete from '../../../../components/_common/Autocomplete';
import * as requests from '../../../services';

const autoCompleteItem = {
  fullName: 'ЦОКАЕВА АЙШАТ МАГОМЕДОВНА',
  id: '315203600035732',
  inn: '200100139185',
  kpp: null,
  ogrn: '315203600035732',
  opfId: '2',
  shortName: null,
};

describe('<RegistrationComponent />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  const wrapper = shallow(<RegistrationComponent />);

  it('Autocomplete', () => {
    expect(wrapper.find('.esp__auth__form__input').prop('disabled')).toBe(true);
    wrapper.find(Autocomplete).invoke('onChange')(autoCompleteItem);
    expect(wrapper.state('search')).toEqual(autoCompleteItem);
    expect(wrapper.state('inn')).toBe(autoCompleteItem.inn);
    expect(wrapper.find('.esp__auth__form__input').prop('disabled')).toBe(false);
  });

  it('Email input', () => {
    expect(wrapper.find('.esp__auth__form__email-text')).toHaveLength(0);
    const input = wrapper.find('.esp__auth__form__input');

    input.invoke('onChange')('test@test.ru', false, 'email');
    expect(wrapper.state('email')).toBe('test@test.ru');
    expect(wrapper.find('.esp__auth__form__email-text')).toHaveLength(1);
  });

  /*  it('send email success', async done => {
    const instance = wrapper.instance();

    requests.sendConfirmationCode = jest.fn().mockReturnValue('123123');
    const spy = jest.spyOn(instance, '_timerStart');

    await instance._handlerSendConfirmationCodeClick();
    expect(wrapper.state('confirmId')).toBe('123123');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('#emailCodeId').text()).toBe('Код подтверждения отправлен на test@test.ru ');
    expect(wrapper.find('#emailConfirmedId')).toHaveLength(0);

    done();
  });*/

  it('send email exist', async done => {
    const instance = wrapper.instance();

    requests.sendConfirmationCode = jest.fn().mockReturnValue({ error: 'Пользователь с таким email уже существует' });

    await instance._handlerSendConfirmationCodeClick();
    expect(wrapper.state('emailConfirmed')).toBe(true);
    expect(wrapper.find('#emailCodeId')).toHaveLength(0);
    expect(wrapper.find('#emailConfirmedId').text()).toBe('Электронная почта test@test.ru подтверждена ');

    done();
  });

  it('should call codeConfirm only when 4 characters and register', done => {
    const spy = jest.spyOn(wrapper.instance(), '_handlerConfirmEmailClick');
    const spyRegistration = jest.spyOn(wrapper.instance(), '_onRegistration');

    wrapper.setState({ code: '12' });
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.setState({ code: '123' });
    wrapper.update();
    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.setState({ code: '1234' });
    wrapper.update();
    expect(spy).toHaveBeenCalledTimes(1);

    const registrBtn = wrapper.find('.esp__auth__form__btn_registration');

    expect(registrBtn.prop('disabled')).toBe(false);

    registrBtn.invoke('onClick')(spyRegistration);

    expect(spyRegistration).toHaveBeenCalledTimes(1);

    done();
  });
});
