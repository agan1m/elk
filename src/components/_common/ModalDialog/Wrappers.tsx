'use strict';

import styled from 'styled-components';

import closeIcon from '../../../../public/images/close-icon.svg';

export const ModalWrapper: any = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContentWrapper: any = styled.div`
  position: absolute;
  padding: 30px;
  display: inline-block;
  min-width: 400px;
  max-width: 1000px;
  min-height: 100px;
  background: #fff;
  margin: 20px auto;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14),
    0px 1px 14px 0px rgba(0, 0, 0, 0.12);
`;

export const ModalTextWrapper: any = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

export const ModalHeaderWrapper: any = styled.div`
  margin-bottom: 30px;
  font-weight: 300;
  font-size: 28px;
  text-align: center;
`;

export const ModalIconWrapper: any = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const IconCloseWrapper: any = styled.span`
  background: url(${closeIcon}) 100% 100% no-repeat;
  cursor: pointer;
  user-select: none;
  width: 16px;
  height: 18px;
  display: inline-block;
`;
