import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalBodyDirective } from './directives/modal-body.directive';
import { ModalComponent } from './components/modal/modal.component';
import { InternalModalService } from './services/internal-modal.service';
import { ModalService } from './services/modal.service';
import { ModalSize } from './enums/modal-size.enum';
import { ModalConfig } from './modal.config';

export interface Config {
  backdrop?: boolean;
  closable?: boolean;
  size?: ModalSize;
  scrollable?: boolean;
  centered?: boolean;
  acceptText?: string,
  cancelText?: string
}

const MODAL_CONFIG = new InjectionToken<Config>('Config');

function modalConfigFactory(config?: Config): ModalConfig {
  const defaultConfig = new ModalConfig();

  if (config) {
    if (config.backdrop !== undefined) defaultConfig.backdrop = config.backdrop;
    if (config.closable !== undefined) defaultConfig.closable = config.closable;
    if (config.size !== undefined) defaultConfig.size = config.size;
    if (config.scrollable !== undefined) defaultConfig.scrollable = config.scrollable;
    if (config.centered !== undefined) defaultConfig.centered = config.centered;
    if (config.acceptText !== undefined) defaultConfig.acceptText = config.acceptText;
    if (config.cancelText !== undefined) defaultConfig.cancelText = config.cancelText;
  }

  return defaultConfig;
}

@NgModule({
  declarations: [
    ModalBodyDirective,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ModalConfig,
      useFactory: modalConfigFactory
    },
    InternalModalService,
    ModalService
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule {

  public static forRoot(config: Config): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [
        {
          provide: MODAL_CONFIG,
          useValue: config
        },
        {
          provide: ModalConfig,
          useFactory: modalConfigFactory,
          deps: [MODAL_CONFIG]
        },
      ]
    }
  }
}
