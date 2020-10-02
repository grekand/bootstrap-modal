import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from '../../environments/environment';
import { BookModel } from "../models/book.model";

@Injectable({
  providedIn: "root"
})
export class GoogleBooksService {
  public constructor(private _httpClient: HttpClient) {}

  public searchBooks(term: string): Observable<BookModel[]> {
    const params = new HttpParams()
      .append("q", term)
      .append("projection", "lite")
      .append("langRestrict", "es");

    return this._httpClient
      .get(environment.googleBooks.url, { params })
      .pipe(map((response: any) => response.items.map(this._listMap)));
  }

  private _listMap(googleBookItem: any): BookModel {
    const bookModel = new BookModel();

    if (googleBookItem != null) {
      if (googleBookItem.volumeInfo != null) {
        if (googleBookItem.volumeInfo.title != null)
          bookModel.title = googleBookItem.volumeInfo.title;
        if (googleBookItem.volumeInfo.authors != null)
          bookModel.authors = googleBookItem.volumeInfo.authors;
        if (googleBookItem.volumeInfo.publisher != null)
          bookModel.publisher = googleBookItem.volumeInfo.publisher;
        if (googleBookItem.volumeInfo.publishedDate != null)
        {
          const date = Date.parse(googleBookItem.volumeInfo.publishedDate);

          if (date)
            bookModel.publishedDate = new Date(date);
        }
      }
    }

    return bookModel;
  }
}
