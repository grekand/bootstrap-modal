import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html'
})
export class PersonalInfoComponent implements OnInit, OnDestroy {

  public personalInfo = {
    name: '',
    surname: ''
  };

  constructor() { }

  public ngOnInit(): void {
    console.log('Create: PersonalInfoComponent');
  }

  public ngOnDestroy(): void {
    console.log('Destroy: PersonalInfoComponent');
  }

}
