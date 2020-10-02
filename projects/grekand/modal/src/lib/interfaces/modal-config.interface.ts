import { Type } from '@angular/core';

import { ModalSize } from '../enums/modal-size.enum';

/**
 * Modal configuration.
 */
export interface ModalConfig<T = any> {
  /**
   * Modal title.
   */
  title?: string;

  /**
   * Modal closable.
   */
  closable?: boolean;

  /**
   * Modal backdrop closable.
   */
  backdrop?: boolean;

  /**
   * Modal size.
   */
  size?: ModalSize;

  /**
   * Modal scrollable.
   */
  scrollable?: boolean;

  /**
   * Modal vertically centered.
   */
  centered?: boolean;

  /**
   * Modal body component.
   */
  component: Type<T>;

  /**
   * Text of accept button.
   */
  acceptText?: string;

  /**
   * Modal accept function. If this is not defined then accept button are not appeare.
   */
  accept?: (component: T) => void;

  /**
   * Text of cancel button.
   */
  cancelText?: string;

  /**
   * Modal cancel function. If this is not defined then cancel button are not appeare.
   */
  cancel?: (component: T) => void;

  /**
   * Set external data on the component when it's loaded.
   */
  data?: (component: T) => void;
}
