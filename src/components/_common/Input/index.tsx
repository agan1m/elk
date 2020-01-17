import { h, Component, createRef } from 'preact';
import { IProps, IState } from './Interfaces';
import { InputWrapper, ErrorSpan, InputContainer, PasswordIconWrap } from './Wrappers';
import ValidateRules from '../../../helpers/ValidateRules';
import {
  EMAIL_FORMAT_ERROR,
  REQUIRED_FIELD,
  INN_FORMAT_ERROR,
  KPP_FORMAT_ERROR,
  KPP_LENGTH_ERROR,
  SNILS_LENGTH_ERROR,
  SNILS_CONTROL_NUMBER_ERROR,
  // PASSWORD_LENGTH_ERROR,
  PASSWORD_HARD_ERROR,
} from './constants';
import PasswordIcon from '../../Icons/PasswordEye';

class Input extends Component<IProps, IState> {
  input: any;
  _timerValue: any;
  _timerMask: any;
  _validTimer: any;
  _caretPosition: number;

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: props.value || '',
      tempValue: props.value || '',
      maskValue: props.value || '',
      errorMsg: '',
      hasError: false,
      disabled: props.disabled || false,
      inProccess: false,
      passwordHide: true,
    };

    this._timerValue = null;
    this._timerMask = null;
    this._validTimer = null;
    this._caretPosition = 0;
    this.input = createRef();
  }

  static prevPropValue = '';

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.value !== Input.prevPropValue && state.value === props.value) {
      Input.prevPropValue = props.value;

      return { ...state, value: props.value };
    }
    return state;
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return (
      !!Object.keys(this.state).find(key => {
        return nextState[key] !== this.state[key];
      }) ||
      nextProps.value !== this.state.value ||
      nextProps.disabled !== this.state.disabled
    );
  }

  componentDidMount() {
    const { validateAfterMount, value } = this.props;

    validateAfterMount && this._validateInputCallBack(value);
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { value, hasError } = this.state;
    const { onChange, name, disabled: propsDisabled, mask } = this.props;

    if (propsDisabled !== prevProps.disabled) {
      this.setState({
        disabled: propsDisabled,
      });
    }

    if (prevState.hasError !== hasError) {
      onChange && onChange(value, hasError, name);
    }

    const { current: input } = this.input;

    if (!mask && input.base === document.activeElement) {
      input.base.setSelectionRange(this._caretPosition, this._caretPosition);
    }
  }

  _onChange() {
    const { onChange, name } = this.props;
    const { hasError, value } = this.state;

    if (onChange) {
      onChange(value, hasError, name);
    }

    this._validateInputCallBack(value);
  }

  _validateRules(rule: any) {
    switch (rule) {
      case 'email':
        return this._validateEmail;
      case 'inn':
        return this._validateInn;
      case 'kpp':
        return this._validateKpp;
      case 'password':
        return this._validatePassword;
      case 'passwordHard':
        return this._validatePasswordHard;
      case 'snils':
        return this._validateSnils;
      default:
        return this._validateDefault;
    }
  }

  _handleInput = async (event: any) => {
    window.clearTimeout(this._timerValue);

    this._timerValue = window.setTimeout(async () => {
      const { unmask, value: propValue } = this.props;
      const { value, selectionStart } = event.target;

      this._caretPosition = selectionStart;

      if (propValue === value) {
        return;
      }

      if (unmask) {
        return;
      }

      this.setState(
        {
          value: value,
          hasError: false,
          errorMsg: '',
        },
        this._onChange,
      );
    }, 100);
  };

  _handleMaskInput = (value: any, mask: any) => {
    window.clearTimeout(this._timerMask);

    this._timerMask = window.setTimeout(async () => {
      const { unmask } = this.props;

      const { unmaskedValue = '' } = mask || {};

      if (!unmask) {
        return;
      }

      this.setState(
        {
          value: unmaskedValue,
          maskValue: value,
        },
        this._onChange,
      );
    }, 100);
  };

  _setValue(value: any) {
    this.setState(
      {
        value: value,
      },
      () => this._validateInputCallBack(value),
    );
  }

  _validateInput(val: any) {
    const { validKey, required } = this.props;
    const { value } = this.state;

    let error: any;

    if (validKey || required) {
      const validateFunc = this._validateRules(validKey);

      error = validateFunc(val != null ? val : value);

      this._setError(error);
    }

    return error;
  }

  async _setError(error: any) {
    if (error) {
      await this.setState({
        hasError: true,
        errorMsg: error['message'] || false,
      });
    } else {
      await this.setState({
        hasError: false,
        errorMsg: '',
      });
    }
  }

  _serviceValidateInput = (value: any) => {
    const { hasError } = this.state;
    const { serviceValidate } = this.props;

    const isServiseValidate = serviceValidate && serviceValidate instanceof Function;

    if (!isServiseValidate || hasError || !value) {
      return Promise.resolve();
    }

    window.clearTimeout(this._validTimer);
    this._validTimer = window.setTimeout(async () => {
      const isFocused = document.activeElement === this.input;

      this.setState({ inProccess: true });

      try {
        const result: any = await serviceValidate(value);

        if (result.isError) {
          this.setState(
            {
              hasError: true,
              inProccess: false,
              error: {
                message: result['message'] || false,
              },
            },
            () => isFocused && this.input.focus(),
          );
        } else {
          this.setState(
            {
              inProccess: false,
            },
            () => isFocused && this.input.focus(),
          );
        }
      } catch (error) {
        this.setState(
          {
            hasError: true,
            inProccess: false,
            error: {
              message: error.message || 'Ошибка соединения с сервисом',
            },
          },
          () => isFocused && this.input.focus(),
        );
      }
    }, 500);
  };

  _validateInputCallBack = async (value: any) => {
    try {
      await this._validateInput(value);
    } catch (error) {
      window.console.error(error);
    }
  };

  validate = () => {
    const { value } = this.state;

    return this._validateInput(value);
  };

  _validateDefault = (value: any) => {
    const { required } = this.props;
    let error: any;

    value = value && value.trim();

    if (required && !ValidateRules.require(value)) {
      error = {
        message: REQUIRED_FIELD,
      };
    }

    return error;
  };

  _validateEmail = (value: any) => {
    const { required } = this.props;
    let error: any;

    value = value && value.trim();

    if (required && !ValidateRules.require(value)) {
      error = {
        message: REQUIRED_FIELD,
      };
    } else if (value && !ValidateRules.email(value)) {
      error = {
        message: EMAIL_FORMAT_ERROR,
      };
    }

    return error;
  };

  _validateInn = (value: any) => {
    const { required } = this.props;
    let error: any;

    value = value && value.trim();

    if (required && !value) {
      error = {
        message: REQUIRED_FIELD,
      };
    }

    if (!ValidateRules.inn(value)) {
      error = {
        message: INN_FORMAT_ERROR,
      };
    }

    return error;
  };

  _validateKpp = (value: any) => {
    const { required } = this.props;
    let error: any;

    if (required && !ValidateRules.require(value)) {
      error = {
        message: REQUIRED_FIELD,
      };
    } else if (value.length !== 9) {
      error = {
        message: KPP_LENGTH_ERROR,
      };
    } else if (!ValidateRules.kpp(value)) {
      error = {
        message: KPP_FORMAT_ERROR,
      };
    }

    return error;
  };

  _validateSnils = (snils: any) => {
    const { required } = this.props;

    const error: any = {};
    let result = false;

    if (typeof snils === 'number') {
      snils = snils.toString();
    } else if (typeof snils !== 'string') {
      snils = '';
    }
    if (!snils.length) {
      if (required) {
        error.message = REQUIRED_FIELD;
      }
    } else if (snils.length !== 11) {
      error.message = SNILS_LENGTH_ERROR;
    } else {
      let sum: any = 0;

      for (let i = 0; i < 9; i++) {
        sum += parseInt(snils[i]) * (9 - i);
      }
      let checkDigit = 0;

      if (sum < 100) {
        checkDigit += sum;
      } else if (sum > 101) {
        checkDigit += sum % 101;
        if (checkDigit === 100) {
          checkDigit += 0;
        }
      }

      if (checkDigit === parseInt(snils.slice(-2))) {
        result = true;
      } else {
        error.message = SNILS_CONTROL_NUMBER_ERROR;
      }
    }
    return result === true ? null : error;
  };

  _validatePassword = (value: any) => {
    let error: any;

    value = value.trim();
    if (!ValidateRules.require(value)) {
      error = {
        message: REQUIRED_FIELD,
      };
    }

    return error;
  };

  _validatePasswordHard = (value: any) => {
    let error: any;

    if (!ValidateRules.require(value)) {
      error = {
        message: REQUIRED_FIELD,
      };
    } else if (!ValidateRules.password(value)) {
      error = {
        message: PASSWORD_HARD_ERROR,
      };
    }

    return error;
  };

  _passwordHide = () => {
    const { passwordHide } = this.state;

    this.setState({ passwordHide: !passwordHide });
  };

  render() {
    const { width, optionCaption, mask, type, validKey, placeholder, withEye, className } = this.props;
    const { value, maskValue, errorMsg, hasError, inProccess, disabled, passwordHide } = this.state;

    return (
      <InputContainer className={`esp__input ${className || ''}`} width={width}>
        <InputWrapper
          ref={this.input}
          {...this.props}
          className="esp__input__wrapper"
          unmask={false}
          required={false}
          placeholder={optionCaption || placeholder}
          onChange={this._handleInput}
          onAccept={this._handleMaskInput}
          onBlur={this._serviceValidateInput}
          value={mask ? maskValue : value}
          error={errorMsg}
          disabled={disabled || inProccess}
          type={type === 'password' ? (passwordHide ? 'password' : 'text') : type}
        />
        {validKey === 'password' && withEye ? (
          <PasswordIconWrap className="esp__input__password-wrapper" onClick={this._passwordHide}>
            <PasswordIcon className="esp__input__password-icon" isHide={!passwordHide} />
          </PasswordIconWrap>
        ) : null}
        {hasError ? (
          <ErrorSpan className="esp__input__error">{errorMsg}</ErrorSpan>
        ) : (
          <ErrorSpan className="esp__input__error">&nbsp;</ErrorSpan>
        )}
      </InputContainer>
    );
  }
}

export default Input;
