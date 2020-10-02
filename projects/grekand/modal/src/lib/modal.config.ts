import { Injectable } from '@angular/core';

import { ModalSize } from './enums/modal-size.enum';

@Injectable()
export class ModalConfig {

  constructor(
    public backdrop = true,
    public closable = true,
    public size = ModalSize.md,
    public scrollable = false,
    public centered = false,
    public acceptText = 'Accept',
    public cancelText = 'Cancel'
  ) { }

}
