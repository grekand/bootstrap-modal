import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-display-personal-info',
  templateUrl: './display-personal-info.component.html'
})
export class DisplayPersonalInfoComponent implements OnInit, OnDestroy {

  public personalInfo: {
    name: string;
    surname: string;
  };

  constructor() { }

  public ngOnInit(): void {
    console.log('Create: DisplayPersonalInfoComponent');
  }

  public ngOnDestroy(): void {
    console.log('Destroy: DisplayPersonalInfoComponent');
  }

}
