'use strict';

import styled from 'styled-components';
import { IStyle } from './Interfaces';

import dropIcon from '../../../../public/images/spoiler-icon.svg';

export const DropdownContainer: any = styled.span`
  position: relative;
  font-size: 14px;
`;

export const InputContainer: any = styled.span<IStyle>`
  cursor: pointer;
  word-wrap: break-word;
  line-height: 1;
  white-space: normal;
  outline: 0;
  transform: rotate(0deg);
  width: ${props => (props.width ? props.width : '200px')};
  min-height: 35px;
  background: #fff;
  display: inline-block;
  padding: 10px 28px 10px 12px;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  box-sizing: border-box;
  font-size: 14px;
  color: hsla(0, 0%, 75%, 0.87);
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownList: any = styled.div<IStyle>`
  cursor: auto;
  position: absolute;
  outline: none;
  top: 80%;
  left: 0;
  width: ${props => (props.width ? props.width : '200px')};
  min-width: max-content;
  margin: 0;
  padding: 0;
  background: #fff;
  font-size: 14px;
  text-shadow: none;
  text-align: left;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  transition: opacity 0.1s ease;
  z-index: 11;
  will-change: transform, opacity;
  box-sizing: border-box;
`;

export const DropdownItem: any = styled.div`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1;
  color: rgba(0, 0, 0, 0.87);
  padding: 10px 10px;
  font-size: 14px;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  white-space: normal;
  word-wrap: normal;
  border-top: 1px solid #fafafa;
  box-sizing: border-box;
  :hover {
    background: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.95);
    z-index: 13;
  }
`;

export const SelectText: any = styled.span`
  color: rgba(0, 0, 0, 0.95);
  white-space: nowrap;
`;

export const DropdownIcon: any = styled.span`
  background-image: url(${dropIcon});
  background-repeat: no-repeat;
  background-position: center;
  padding: 8px;
  position: absolute;
  right: 8px;
  top: calc(50% - 8px);
  transform: rotate(90deg);
`;

export const CloseIconWrapper: any = styled.span`
  position: absolute;
  right: 8px;
  top: calc(50% - 8px);
  transform: rotate(90deg);
`;
