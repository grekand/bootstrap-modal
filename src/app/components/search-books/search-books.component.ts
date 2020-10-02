import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { BookModel } from "../../models/book.model";
import { GoogleBooksService } from "../../services/google-books.service";
import { SearchBoxComponent, SearchBoxResult } from "../search-box/search-box.component";

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html'
})
export class SearchBooksComponent implements OnInit, OnDestroy {
  @ViewChild("searchBox", { static: true })
  private _searchBox: SearchBoxComponent;

  public books$: Observable<BookModel[]>;

  public constructor(private _googleBooksService: GoogleBooksService) {}

  public ngOnInit(): void {
    console.log('Create: SearchBooksComponent');

    this.books$ = this._searchBox.valueChanges.pipe(
      filter(this._searchBoxNoEmpty),
      switchMap(this._searchBoxSearchBooks.bind(this))
    );
  }

  public ngOnDestroy(): void {
    console.log('Destroy: SearchBooksComponent');
  }

  private _searchBoxNoEmpty(searchBoxResult: SearchBoxResult): boolean {
    return !searchBoxResult.isEmpty;
  }

  private _searchBoxSearchBooks(searchBoxResult: SearchBoxResult): Observable<BookModel[]> {
    return this._googleBooksService.searchBooks(searchBoxResult.value);
  }
}
