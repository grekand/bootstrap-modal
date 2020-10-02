import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalConfig } from '../../modal.config';
import { ModalSize } from '../../enums/modal-size.enum';
import { InternalModalConfig } from '../../interfaces/internal-modal-config.interface';
import { ModalBodyDirective } from '../../directives/modal-body.directive';
import { InternalModalService } from '../../services/internal-modal.service';

/**
 * Extern JQuery library.
 */
declare const $: any;

/**
 * Modal component.
 */
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit, OnDestroy {

  /**
   * Reference to modal element.
   */
  @ViewChild('modal', { static: true })
  private _modal: ElementRef<HTMLDivElement>;

  /**
   * Reference to modal element body.
   */
  @ViewChild(ModalBodyDirective, { static: true })
  private _modalBody: ModalBodyDirective;

  /**
   * Subscription to show modal.
   */
  private _showSubscription: Subscription;

  /**
   * Bootstrap event handlers bound to this class.
   */
  private _bootstrapEventHandlers = {
    modalShow: this.modalShowEvent.bind(this),
    modalHide: this.modalHideEvent.bind(this),
    modalHidden: this.modalHiddenEvent.bind(this)
  };

  /**
   * This flag is used when accept button is pressed, then cancel event is ignored when modal it's hidding.
   */
  private _isAccepted = false;

  /**
   * Modal size aliases to use from template.
   */
  public ModalSize = ModalSize;

  /**
   * Initialize some services.
   * @param {ModalService} internalModalService - Modal service.
   * @param {ComponentFactoryResolver} _componentFactoryResolver - Component factory resolver.
   */
  constructor(
    private _modalConfig: ModalConfig,
    private _componentFactoryResolver: ComponentFactoryResolver,
    public internalModalService: InternalModalService
  ) { }

  /**
   * Method called when modal component is loaded by first time.
   */
  public ngOnInit(): void {
    $(this._modal.nativeElement).on('show.bs.modal', this._bootstrapEventHandlers.modalShow);
    $(this._modal.nativeElement).on('hide.bs.modal', this._bootstrapEventHandlers.modalHide);
    $(this._modal.nativeElement).on('hidden.bs.modal', this._bootstrapEventHandlers.modalHidden);

    this._showSubscription = this.internalModalService.show$.subscribe(modalConfig => {
      const config: InternalModalConfig = { ...this._modalConfig, ...modalConfig };
      const viewContainerRef = this._modalBody.viewContainerRef;

      viewContainerRef.detach();

      if (config.componentInstance) {
        viewContainerRef.insert(config.componentInstance.hostView);
      }
      else {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(config.component);

        config.componentInstance = viewContainerRef.createComponent(componentFactory);

        if (config.data) {
          config.data(config.componentInstance.instance);
        }
      }

      this.internalModalService.currentModalConfig = config;

      $(this._modal.nativeElement).modal({
        backdrop: config.backdrop || 'static',
        keyboard: config.closable,
        focus: true,
        show: true
      });
    });
  }

  /**
   * Method called when modal component is removed from the template.
   */
  public ngOnDestroy(): void {
    $(this._modal.nativeElement).off('show.bs.modal', this._bootstrapEventHandlers.modalShow);
    $(this._modal.nativeElement).off('hide.bs.modal', this._bootstrapEventHandlers.modalHide);
    $(this._modal.nativeElement).off('hidden.bs.modal', this._bootstrapEventHandlers.modalHidden);

    if (this._showSubscription && !this._showSubscription.closed) {
      this._showSubscription.unsubscribe();
    }
  }

  /**
   * Event handler for 'show.bs.modal' bootstrap event.
   */
  private modalShowEvent(): void {
    this.internalModalService.modalShow();
  }

  /**
   * Event handler for 'hide.bs.modal' bootstrap event.
   */
  private modalHideEvent(): void {
    if (this.internalModalService.currentModalConfig) {
      if (!this._isAccepted && this.internalModalService.currentModalConfig.cancel) {
        this.internalModalService.currentModalConfig.cancel(this.internalModalService.currentModalConfig.componentInstance.instance);
      }
      else if (this._isAccepted && this.internalModalService.currentModalConfig.accept) {
        this.internalModalService.currentModalConfig.accept(this.internalModalService.currentModalConfig.componentInstance.instance);
      }
    }

    this._isAccepted = false;
  }

  /**
   * Event handler for 'hidden.bs.modal' bootstrap event.
   */
  private modalHiddenEvent(): void {
    this.internalModalService.modalHidden();
  }

  /**
   * Check if modal size is applicable.
   * @param {ModalSize} size - Modal size.
   */
  public checkApplicableSize(size: ModalSize): boolean {
    return this.internalModalService.currentModalConfig && this.internalModalService.currentModalConfig.size === size;
  }

  /**
   * Method called when accept button is pressed in the modal.
   */
  public accept(): void {
    this._isAccepted = true;
    $(this._modal.nativeElement).modal('hide');
  }

}
