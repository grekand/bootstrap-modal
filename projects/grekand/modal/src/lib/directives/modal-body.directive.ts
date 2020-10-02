import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Directive for get the 'ng-template' content reference.
 */
@Directive({
  selector: 'ng-template[grkndModalBody]'
})
export class ModalBodyDirective {

  constructor(
    /**
     * ng-template container reference.
     */
    public viewContainerRef: ViewContainerRef
  ) { }

}
