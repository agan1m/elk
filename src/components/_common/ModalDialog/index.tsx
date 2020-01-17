'use strict';

import { h } from 'preact';
import Portal from 'preact-portal';
import {
  ModalWrapper,
  ModalContentWrapper,
  ModalTextWrapper,
  ModalHeaderWrapper,
  ModalIconWrapper,
  IconCloseWrapper,
} from './Wrappers';

export const Modal: any = ({ open, into = 'tariff-modal-dialog', children, headerText, onClose }) =>
  open ? (
    <Portal into={into} className="esp__portal">
      <ModalWrapper className="esp__model-wrapper">
        <ModalContentWrapper className="esp__model-content-wrapper">
          <ModalIconWrapper className="esp__model-icon-wrapper">
            <IconCloseWrapper className="esp__icon-close-wrapper" onClick={onClose}></IconCloseWrapper>
          </ModalIconWrapper>
          <ModalHeaderWrapper className="esp__model-header-wrapper">{headerText}</ModalHeaderWrapper>
          <ModalTextWrapper className="esp__model-text-wrapper">{children}</ModalTextWrapper>
        </ModalContentWrapper>
      </ModalWrapper>
    </Portal>
  ) : null;
