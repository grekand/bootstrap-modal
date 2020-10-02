import { ComponentRef } from '@angular/core';

import { ModalConfig } from './modal-config.interface';

/**
 * Modal configuration.
 */
export interface InternalModalConfig<T = any> extends ModalConfig<T> {
  /**
   * Modal body component instance.
   */
  componentInstance?: ComponentRef<any>;
}
