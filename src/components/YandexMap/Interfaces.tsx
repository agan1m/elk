'use strict';

export interface IProps {
    list?: any[];
    width?: number;
    onPlacemarkClick?: (data?: any) => void;
}
  
export interface IState {
    center: any[];
    isLoad: boolean;
}
