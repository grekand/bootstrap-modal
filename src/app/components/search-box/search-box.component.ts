import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { skip, debounceTime, map } from "rxjs/operators";

import { environment } from 'src/environments/environment';

export interface SearchBoxResult {
  value: string;
  isEmpty: boolean;
}

@Component({
  selector: "app-search-box",
  templateUrl: "./search-box.component.html"
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @ViewChild("searchBox", { static: true })
  private _searchBox: NgModel;

  @Input()
  public placeholder: string;

  @Input()
  public value: string;

  @Output()
  public valueChanges = new EventEmitter<SearchBoxResult>();

  private _searchBoxSubscription: Subscription;

  public ngOnInit(): void {
    const result: Observable<SearchBoxResult> = this._searchBox.valueChanges.pipe(
      skip(1),
      debounceTime(environment.searchBoxResponseTime),
      map(this._searchBoxMap)
    );

    this._searchBoxSubscription = result.subscribe((value) =>
      this.valueChanges.emit(value)
    );
  }

  public ngOnDestroy(): void {
    this._searchBoxSubscription.unsubscribe();
  }

  private _searchBoxMap(searchBoxValue: string): SearchBoxResult {
    const value = searchBoxValue.trim();

    return {
      value,
      isEmpty: value.length === 0
    };
  }
}
