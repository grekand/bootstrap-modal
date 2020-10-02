import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { InternalModalConfig } from '../interfaces/internal-modal-config.interface';

/**
 * Service for manager internal Bootstrap modals.
 */
@Injectable()
export class InternalModalService {

  /**
   * Observable to show a new modal.
   */
  private _show$: Subject<InternalModalConfig>;

  /**
   * Flag that indicate if exist any modal opened.
   */
  private _isModalOpen: boolean;

  /**
   * Flag that indicates if there is a modal before the last one to open it when the last one is closed.
   */
  private _isOpeningPrevious: boolean;

  /**
   * List of opened modals.
   */
  private _modalConfigList: InternalModalConfig[];

  /**
   * Next modal to open if any modal is now showing.
   */
  private _nextModalConfig: InternalModalConfig;

  /**
   * Current modal showing.
   */
  public currentModalConfig: InternalModalConfig;

  /**
   * Gets an observable that emits value when a new modal is created.
   */
  public get show$(): Observable<InternalModalConfig> {
    return this._show$.asObservable();
  }

  /**
   * Initialize the internal modal service.
   */
  constructor() {
    this._show$ = new Subject<InternalModalConfig>();
    this._isModalOpen = false;
    this._isOpeningPrevious = false;
    this._modalConfigList = [];
    this._nextModalConfig = null;
    this.currentModalConfig = null;
  }

  /**
   * Method called from 'modal.component' when 'show.bs.modal' event handler is triggered.
   */
  public modalShow(): void {
    this._isModalOpen = true;

    if (this._isOpeningPrevious) {
      this._isOpeningPrevious = false;
    }
    else {
      this._modalConfigList.push(this.currentModalConfig);
    }
  }

  /**
   * Method called from 'modal.component' when 'hidden.bs.modal' event handler is triggered.
   */
  public modalHidden(): void {
    this._isModalOpen = false;

    if (this._nextModalConfig) {
      this.show(this._nextModalConfig);
      this._nextModalConfig = null;
    }
    else {
      this._modalConfigList.pop();
      this.currentModalConfig.componentInstance.hostView.destroy();
      this.currentModalConfig = null;

      if (this._modalConfigList.length) {
        this._isOpeningPrevious = true;
        this.show(this._modalConfigList[this._modalConfigList.length - 1]);
      }
    }
  }

  /**
   * Show a new modal.
   * @param {ModalConfig<T>} modalConfig - Modal config of a component.
   */
  public show<T>(modalConfig: InternalModalConfig<T>): void {
    if (modalConfig) {
      if (this._isModalOpen) {
        this._nextModalConfig = modalConfig;
      }
      else {
        this._show$.next(modalConfig);
      }
    }
  }

  /**
   * Clean all modals.
   */
  public cleanAll(): void {
    this._modalConfigList.forEach(config => config.componentInstance.destroy());
    this._modalConfigList.splice(0);
  }

}
