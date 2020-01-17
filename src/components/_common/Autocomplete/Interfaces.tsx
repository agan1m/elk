'use strict';

export interface IProps {
    showOnEmptySearch?: boolean;
    service: (data: string) => void;
    options?: [];
    optionValue?: any;
    optionText?: string;
    alternativeOptionText?: any;
    optionCaption?: string;
    optionCaptionPrefix?: string;
    optionTemplate?: (item: any) => void;
    optionControlText?: string;
    value?: any;
    valueTemplate?: (value: any) => string;
    maxLength?: number;
    freeText?: boolean;
    disabled?: boolean;
    showIcon?: boolean;
    validateAfterMount?: boolean;
    onValidate?: (data?: any) => void;
    onInputValidate?: (data?: any) => void;
    onError?: (error?: any) => void;
    onChange?: (data: any, error?: boolean, attr?: string) => void;
    onReset?: () => void;
    onControl?: () => void;
    error?: any;
    hideControls?: boolean;
    tabindex?: any;
    collectionMapper?: (step: number, data?: object) => void;
    width?: any;
    ref?: any;
    title?: string;
};
  
export interface IState {
    showOnEmptySearch: boolean;
    searchTerm: string;
    selectedText: string;
    options: any[];
    optionValue: string;
    optionText: string;
    optionTemplate: (step: number, data?: object) => void;
    optionCaption: string;
    optionCaptionPrefix: string;
    optionControlText: string;
    value: string;
    selectedItem: any,
    disabled: boolean;
    isItemSelected: boolean;
    inProcess: boolean;
    isOpened: boolean;
    isError: boolean;
    isConnectError: boolean;
    lastSearchTerm: string;
    freeText: boolean;
    error: {
        type: number,
        message: string
    };
    testID: string;
};