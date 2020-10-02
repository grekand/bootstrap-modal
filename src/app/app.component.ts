import { Component } from '@angular/core';
import { ModalService, ModalSize } from '@grekand/modal';
import { DisplayPersonalInfoComponent } from './components/display-personal-info/display-personal-info.component';

import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private _modalService: ModalService
  ) { }

  public showModalPersonalInfo(): void {
    this._modalService.show({
      title: 'Información personal',
      component: PersonalInfoComponent,
      cancel: () => undefined,
      accept: ({ personalInfo }) => this._modalService.show({
        title: 'Información personal insertada',
        component: DisplayPersonalInfoComponent,
        data: displayPersonalInfoComponent => displayPersonalInfoComponent.personalInfo = personalInfo,
        cancel: () => undefined,
        accept: () => this._modalService.clearAll()
      })
    });
  }

  public showModalSearchBooks(): void {
    this._modalService.show({
      title: 'Búsqueda de libros',
      component: SearchBooksComponent,
      size: ModalSize.lg,
      acceptText: 'Dejar de buscar',
      accept: () => undefined
    });
  }
}
