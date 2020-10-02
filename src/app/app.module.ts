import '@angular/common/locales/global/es';

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule, ModalSize } from '@grekand/modal';

import { AppComponent } from './app.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { DisplayPersonalInfoComponent } from './components/display-personal-info/display-personal-info.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchBooksComponent } from './components/search-books/search-books.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalInfoComponent,
    DisplayPersonalInfoComponent,
    SearchBoxComponent,
    SearchBooksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot({
      backdrop: true,
      centered: false,
      closable: true,
      scrollable: true,
      size: ModalSize.md,
      acceptText: 'Aceptar',
      cancelText: 'Cancelar'
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  entryComponents: [
    PersonalInfoComponent,
    DisplayPersonalInfoComponent,
    SearchBooksComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
