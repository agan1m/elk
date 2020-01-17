import { h } from 'preact';
import { shallow } from 'enzyme';

import Autocomplete from '../';

const options = [
  {
    value: 0,
    name: 'test_1',
  },
  {
    value: 1,
    name: 'test_2',
  },
  {
    value: 3,
    name: 'test_3',
  },
];

const event = {
  target: {
    value: 'test',
  },
  stopPropagation: () => {
    return null;
  },
};

describe('LoginComponent', () => {
  const wrapper = shallow(<Autocomplete />);
  const inputs = wrapper.find('.esp__auto-complete__input-wrapper');

  it('should render autocomplete', function() {
    expect(wrapper.exists('.esp__auto-complete__input-wrapper')).toEqual(true);
  });

  it('run onChange and check searchTerm in state', () => {
    inputs.first().invoke('onChange')(event);
    expect(wrapper.state('searchTerm')).toBe('test');
  });

  it('set options and check open list', () => {
    wrapper.setState({ isOpened: true, options: options });

    expect(wrapper.exists('.esp__auto-complete__input-wrapper')).toEqual(true);
  });

  it('set options and check list count', () => {
    wrapper.setState({ isOpened: true, options: options });

    expect(wrapper.find('.esp__auto-complete__scroll-element')).toHaveLength(3);
  });

  it('set empty options', () => {
    wrapper.setState({ isOpened: true, options: [] });

    expect(wrapper.find('.esp__auto-complete__item-caption .text-grey').text()).toEqual('Ничего не найдено');
  });

  it('set connecting error', () => {
    wrapper.setState({ isOpened: true, isConnectError: true });

    expect(wrapper.find('.esp__auto-complete__item-caption .text-grey').text()).toEqual(
      'Что-то пошло не так. Проверьте интернет соединение и обновите список',
    );
  });

  it('set process', () => {
    wrapper.setState({ inProcess: true });

    expect(wrapper.exists('.esp__auto-complete__loader-wrapper')).toEqual(true);
  });

  it('set process without icon', () => {
    wrapper.setState({ inProcess: true, showIcon: false });

    expect(wrapper.exists('.esp__auto-complete__search-wrapper')).toEqual(false);
  });

  it('set hide controls', () => {
    wrapper.setProps({ hideControls: true });
    wrapper.setState({ inProcess: true });

    expect(wrapper.exists('.esp__auto-complete__loader-wrapper')).toEqual(false);
  });

  it('set error', () => {
    wrapper.setState({ isError: true, inProcess: false, isOpened: false, error: { message: 'error' } });

    expect(wrapper.exists('.esp__auto-complete__error')).toEqual(true);
  });
});
