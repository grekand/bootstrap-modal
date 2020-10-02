import { Injectable } from '@angular/core';

import { InternalModalService } from './internal-modal.service';
import { ModalConfig } from '../interfaces/modal-config.interface';

/**
 * Service for manager Bootstrap modals.
 */
@Injectable()
export class ModalService {

  /**
   * Initialize the modal service.
   * @param {InternalModalService} _internalModalService - Internal modal service.
   */
  constructor(
    private _internalModalService: InternalModalService
  ) { }

  /**
   * Show a new modal.
   * @param {ModalConfig<T>} modalConfig - Modal config of a component.
   */
  public show<T>(modalConfig: ModalConfig<T>): void {
    return this._internalModalService.show(modalConfig);
  }

  /**
   * Clean all modals.
   */
  public cleanAll(): void {
    this._internalModalService.cleanAll();
  }

}
