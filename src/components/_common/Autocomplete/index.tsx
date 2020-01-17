import { h, Component, createRef } from 'preact';
import {
  InputWrapper,
  InputContainer,
  ResultsWrapper,
  ResultItemWrapper,
  SearchWrapper,
  LoaderWrapper,
  ScrollContainer,
  ErrorSpan,
} from './Wrappers';
import SearchIcon from '../../Icons/SearchIcon';
import LoaderIcon from '../../Icons/LoaderIcon';
import { IProps, IState } from './Interfaces';

export const PRIMARY_TYPE = 0;
export const SUCCESS_TYPE = 1;
export const WARNING_TYPE = 2;
export const DANGER_TYPE = 3;

export default class AutoCompleteStrategy extends Component<IProps, IState> {
  _timer: any;
  _listRef: any;
  virtualFocus: any;
  _closeStop: any;

  constructor(props: IProps) {
    super(props);

    this._timer = null;

    const hasValue = props.value && typeof props.value === 'object';
    const searchTerm = hasValue ? props.value[props.optionText] || '' : '';

    const isItemSelected = Boolean(
      hasValue
        ? props.freeText
          ? props.value[props.optionText]
          : props.value[props.optionValue] || props.value[props.optionText]
        : false,
    );

    this.state = {
      showOnEmptySearch: props.showOnEmptySearch || false,
      searchTerm: searchTerm,
      selectedText: '',
      options: [],
      optionValue: props.optionValue || '',
      optionText: props.optionText || '',
      optionTemplate: props.optionTemplate || null,
      optionCaption: props.optionCaption || null,
      optionCaptionPrefix: props.optionCaptionPrefix || null,
      optionControlText: props.optionControlText || '',
      value: hasValue ? props.value[props.optionValue] : '',
      selectedItem: props.value || {},
      disabled: props.disabled || false,
      isItemSelected: isItemSelected,
      inProcess: false,
      isOpened: false,
      isError: false,
      isConnectError: false,
      lastSearchTerm: '',
      freeText: props.freeText || false,
      error: {
        type: PRIMARY_TYPE,
        message: '',
      },
      testID: '',
    };

    this._listRef = createRef();
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { value, freeText, optionValue, optionText, alternativeOptionText, disabled, error } = nextProps;
    const { isError, searchTerm, selectedItem, value: prevValue } = this.state;

    const currentText = value && (value[optionText] || value[alternativeOptionText]);
    const currentSelectText = selectedItem && (selectedItem[optionText] || selectedItem[alternativeOptionText]);

    const isEmptyObject = !value || (typeof value === 'object' && currentText === null);

    if ((value !== undefined && this.props.value !== value) || (!value && searchTerm)) {
      if (prevValue && isEmptyObject) {
        this._handlerReset(null);
      } else if (value === null || prevValue !== value[optionValue]) {
        this.setState({ searchTerm: value && currentText }, () => this._setValue(value));
      } else if (freeText && currentSelectText !== currentText) {
        this._handlerSelectItem(value);
      }
    } else {
      if (!isEmptyObject && selectedItem && Object.keys(selectedItem).length === 0) {
        this.setState({ selectedItem: value, isItemSelected: true });
      }
    }

    if (disabled && isError && !value && prevValue) {
      this.setState({ isError: false });
    } else if (error) {
      this.setState({ isError: true, error });
    } else if (this.props.error) {
      this.setState({ isError: false, error: { message: '', type: PRIMARY_TYPE } }, () => this._validateInput(value));
    }
  }

  componentDidMount() {
    const { validateAfterMount, value } = this.props;

    document.addEventListener('click', this._handlerHideList);

    if (validateAfterMount) {
      this._validateInput(value);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handlerHideList);
  }

  validate = (value: any) => {
    return this._validateInput(value);
  };

  _setValue(value: any) {
    if (value && Object.keys(value).length) {
      this._createCollectionList([value], false);
      this._handlerSelectItem(value, true);
    } else {
      this.setState({
        searchTerm: '',
        isItemSelected: false,
        selectedItem: {},
        value: null,
      });
    }
  }

  _handlerKeyDown = (event: any) => {
    const { keyCode = '' } = event || {};
    const { optionValue, optionText, alternativeOptionText } = this.props;
    const { options, selectedItem } = this.state;

    const currentIndex = options && options.findIndex(item => item[optionValue] === (selectedItem || {})[optionValue]);

    let newItem = selectedItem || {};

    if (keyCode === 38) {
      newItem = options[currentIndex - 1] || newItem || options[0];
    } else if (keyCode === 40) {
      newItem = options[currentIndex + 1] || newItem || options[0];
    } else if (keyCode === 13) {
      this._handlerHideList(null);
    }

    if (newItem[optionValue] !== (selectedItem || {})[optionValue]) {
      this.setState({
        selectedItem: newItem,
        searchTerm: newItem[optionText] || newItem[alternativeOptionText],
        value: newItem[optionValue],
        selectedText: newItem[optionText] || newItem[alternativeOptionText],
      });
    }
  };

  _handlerHideList = (event: any) => {
    if (event) {
      if (event.target === this.virtualFocus) {
        return;
      }
    }

    const { base = false } = this.virtualFocus || {};
    const { value } = this.props;
    const { selectedItem = {}, inProcess, searchTerm, isOpened } = this.state;
    const { optionText, alternativeOptionText } = this.props;

    if (!isOpened) {
      return;
    }

    if (this._closeStop) {
      this._closeStop = false;
      return;
    }

    if (base) {
      base.blur();
    }

    const isItemSelected = !!selectedItem[optionText] || !!selectedItem[alternativeOptionText];
    const isChanged =
      (selectedItem[optionText] || '') !== ((value || {})[optionText] || '') ||
      (selectedItem[alternativeOptionText] || '') !== ((value || {})[alternativeOptionText] || '');

    this.setState(
      {
        isItemSelected: isItemSelected,
        isOpened: false,
        searchTerm: inProcess ? searchTerm : '',
      },
      () => (isChanged ? this._handlerCallBackChange(selectedItem) : !isItemSelected && this._validateInput()),
    );
  };

  _handlerSelectItem = (selectedItem: any, isForce = false) => {
    const { disabled, optionValue, optionText, alternativeOptionText } = this.props;

    if (disabled && !isForce) {
      return;
    }

    if (!selectedItem || !Object.keys(selectedItem).length) {
      return;
    }

    const selectedValue = selectedItem[optionValue];

    const selectedText = selectedItem[optionText] || selectedItem[alternativeOptionText];

    /*  if (this.virtualFocus) {
      this.virtualFocus.blur();
    } */

    this.setState(
      {
        selectedItem: selectedItem,
        searchTerm: selectedText,
        value: selectedValue,
        isItemSelected: !!selectedText,
        selectedText: selectedText,
        isOpened: false,
      },
      () => this._handlerCallBackChange(selectedItem),
    );
  };

  _validateTermInput(value: any) {
    const { onInputValidate } = this.props;

    let error: any;

    if (onInputValidate) {
      error = onInputValidate.call(onInputValidate, value);

      this._setError(error);
    }

    return error;
  }

  _validateInput(value?: any) {
    const { onValidate } = this.props;
    const { selectedItem } = this.state;

    let error: any;

    if (onValidate) {
      error = onValidate.call(onValidate, value || selectedItem);

      this._setError(error);
    }

    return error;
  }

  _setError(error: any) {
    if (error) {
      this.setState({
        isError: true,
        isOpened: false,
        error: {
          type: error['type'] || PRIMARY_TYPE,
          message: error['message'] || false,
        },
      });
    } else {
      this.setState({
        isError: false,
      });
    }
  }

  _handlerCallBackChange(item: any) {
    const { onChange } = this.props;

    if (onChange) {
      onChange.call(this, item);
    }

    this._validateInput(item);
  }

  _handlerCallBackError(error: any) {
    const { onError } = this.props;

    if (onError) {
      onError.call(this, error);
    }
  }

  _handlerTermInput = (event: any) => {
    event && event.stopPropagation();

    const { isItemSelected, searchTerm } = this.state;
    const { valueTemplate } = this.props;

    const { value } = event.target;

    if (searchTerm === value) {
      return;
    }

    if (isItemSelected && valueTemplate) {
      this._handlerReset(null);
    } else {
      this.setState(
        {
          searchTerm: value,
          isOpened: false,
          isError: false,
        },
        () => (value ? this._handlerServiceStart(value) : this._handlerCallBackChange(null)),
      );
    }
  };

  _handlerServiceStart(searchTerm = '', isOpenList = true) {
    const { service = false } = this.props;
    const { virtualFocus } = this;

    return new Promise(() => {
      const isError = this._validateTermInput(searchTerm);

      if (isError) {
        window.clearTimeout(this._timer);
        return;
      }

      if (service && service instanceof Function) {
        window.clearTimeout(this._timer);

        this._timer = window.setTimeout(async () => {
          this.setState({
            inProcess: true,
            isOpened: false,
            isConnectError: false,
            lastSearchTerm: searchTerm,
          });

          let data = null;

          try {
            data = await service(searchTerm);
          } catch (error) {
            this.setState(
              {
                isConnectError: true,
                options: [],
                isOpened: isOpenList,
                inProcess: false,
              },
              () => {
                virtualFocus.focus();
                virtualFocus.setSelectionRange(virtualFocus.value.length, virtualFocus.value.length);
                this._handlerCallBackError(error);
              },
            );
            return error;
          }

          if (!data) {
            isOpenList = !isOpenList;
          }

          this._createCollectionList(data || [], isOpenList);
        }, 700);
      }
    });
  }

  _createCollectionList(collection: any, isOpenList: any) {
    const { collectionMapper } = this.props;

    return new Promise(res => {
      this.setState(
        {
          options: collectionMapper ? collectionMapper(collection) : collection,
          isOpened: isOpenList,
          inProcess: false,
          isError: false,
        },
        res,
      );
    });
  }

  _handlerReset(event: any) {
    event && event.stopPropagation();

    this.setState(
      {
        searchTerm: '',
        isItemSelected: false,
        isOpened: false,
        lastSearchTerm: '',
        options: [],
        selectedItem: {},
        value: null,
        isError: false,
      },
      () => {
        this._handlerCallBackChange(null);
      },
    );

    window.clearTimeout(this._timer);
  }

  _handlerFocusField = (event: any) => {
    event && event.stopPropagation();

    const { showOnEmptySearch, searchTerm, options, isOpened } = this.state;

    if (showOnEmptySearch && !isOpened) {
      this._handlerServiceStart(searchTerm);
    } else {
      if (!this._closeStop) {
        if (options.length) {
          this._closeStop = true;
          this.setState({ isOpened: true });
        }
      }
    }
  };

  _handlerBlurField = (event: any) => {
    event && event.stopPropagation();

    const { searchTerm, isItemSelected, selectedItem, isOpened } = this.state;
    const { optionText, optionValue, freeText, alternativeOptionText } = this.props;

    if (this._closeStop) {
      this._closeStop = false;
      return;
    }

    const selectedItemText =
      optionText in selectedItem ? selectedItem[optionText] || selectedItem[alternativeOptionText] : '';
    const isChanged = selectedItemText !== searchTerm;

    if (freeText && !isItemSelected && searchTerm) {
      const selectedItem = {
        [optionText]: searchTerm,
        [optionValue]: null,
      };
      const selectedValue = selectedItem[optionValue];
      const selectedText = selectedItem[optionText] || selectedItem[alternativeOptionText];

      this.setState(
        {
          selectedItem: selectedItem,
          searchTerm: selectedText,
          value: selectedValue,
          isItemSelected: true,
          selectedText: selectedText,
          options: [],
          isOpened,
        },
        () => {
          if (isChanged) {
            this._handlerCallBackChange(selectedItem);
          }
          !isItemSelected && this._validateInput();
        },
      );
    } else if (isChanged && !searchTerm) {
      this._handlerReset(null);
    } else if (isOpened) {
      const isItemSelected = !!selectedItem[optionText] || selectedItem[alternativeOptionText];

      this.setState(
        {
          searchTerm: selectedItem[optionText] || selectedItem[alternativeOptionText] || '',
          isItemSelected,
          options: [],
          isOpened: false,
        },
        !isItemSelected && this._validateInput,
      );
    }
  };

  _handlerSetNewData(event: any) {
    event && event.stopPropagation();

    const { optionText, selectedItem } = this.state;

    this.setState(
      {
        isItemSelected: false,
        searchTerm: selectedItem[optionText],
      },
      () => {
        const { virtualFocus } = this;

        virtualFocus.focus();
        virtualFocus.setSelectionRange(virtualFocus.value.length, virtualFocus.value.length);
      },
    );
  }

  _renderItems(item: any, index: any) {
    const { optionText, optionTemplate, alternativeOptionText } = this.props;

    return (
      <ResultItemWrapper
        className="esp__auto-complete__scroll-element"
        key={index}
        onMouseDown={() => this._handlerSelectItem(item)}
      >
        {optionTemplate ? optionTemplate(item) : <span>{item[optionText] || item[alternativeOptionText]}</span>}
      </ResultItemWrapper>
    );
  }

  _stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  render() {
    const {
      optionCaption,
      optionText,
      alternativeOptionText,
      disabled,
      hideControls,
      maxLength,
      tabindex,
      width,
      showIcon = true,
      title = '',
      value,
      valueTemplate,
    } = this.props;
    const {
      options,
      searchTerm,
      selectedItem,
      isItemSelected,
      isConnectError,
      inProcess,
      isOpened,
      isError,
      error,
    } = this.state;

    const className = ['auto-complete'];

    if (isError) {
      switch (error['type']) {
        case PRIMARY_TYPE:
          className.push('auto-complete--primary');
          break;
        case SUCCESS_TYPE:
          className.push('auto-complete--success');
          break;
        case WARNING_TYPE:
          className.push('auto-complete--warning');
          break;
        case DANGER_TYPE:
          className.push('auto-complete--danger');
          break;
      }
    }

    if (!showIcon && !inProcess) {
      className.push('auto-complete--long');
    }

    let optionTextValue = selectedItem[optionText];

    if (!optionTextValue && alternativeOptionText) {
      optionTextValue = selectedItem[alternativeOptionText];
    }

    return (
      <span
        className="esp__auto-complete"
        tabIndex={tabindex || -1}
        onKeyDown={this._handlerKeyDown}
        style={{ position: 'relative' }}
      >
        <InputContainer className="esp__autocomplete__input-container" width={width} title={optionTextValue}>
          <InputWrapper
            className="esp__auto-complete__input-wrapper"
            ref={(ref: any) => (this.virtualFocus = ref)}
            value={valueTemplate && optionTextValue && value ? valueTemplate(value) : searchTerm}
            placeholder={optionCaption}
            maxLength={maxLength || '255'}
            onFocus={this._handlerFocusField}
            onBlur={this._handlerBlurField}
            onChange={this._handlerTermInput}
            error={isError && error['message']}
            onClick={this._stopPropagation}
            disabled={disabled}
            title={title}
          />
          {'\n'}
          <span className="esp__auto-complete__controls">
            {hideControls ? null : isItemSelected && !disabled ? (
              <span className="esp__auto-complete__reset" onClick={this._handlerReset.bind(this)} />
            ) : null}
            {hideControls ? null : inProcess ? (
              <LoaderWrapper className="esp__auto-complete__loader-wrapper">
                <LoaderIcon />
              </LoaderWrapper>
            ) : showIcon ? (
              <SearchWrapper className="esp__auto-complete__search-wrapper">
                <SearchIcon color="#bbb" width={13} height={13} />
              </SearchWrapper>
            ) : null}
          </span>
          {isOpened ? (
            <ScrollContainer className="esp__auto-complete__scroll-container">
              <ResultsWrapper
                className="esp__auto-complete__result-wrapper"
                ref={this._listRef}
                onMouseDown={() => (this._closeStop = true)}
              >
                {options.map(this._renderItems.bind(this))}
                {isConnectError || !options.length ? (
                  <div className="esp__auto-complete__error">
                    <span className="esp__auto-complete__item-caption">
                      <span className="text-grey">
                        {isConnectError ? (
                          <i>Что-то пошло не так. Проверьте интернет соединение и обновите список</i>
                        ) : (
                          <i>Ничего не найдено</i>
                        )}
                      </span>
                    </span>
                  </div>
                ) : null}
              </ResultsWrapper>
            </ScrollContainer>
          ) : null}
        </InputContainer>
        {isError && !disabled && !isOpened ? (
          <ErrorSpan className="esp__auto-complete__error">{error['message']}</ErrorSpan>
        ) : null}
      </span>
    );
  }
}
