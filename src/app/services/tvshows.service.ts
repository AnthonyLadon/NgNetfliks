import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { TvShowsDataTypeObject } from "../types/tvshows";

@Injectable({
  providedIn: "root",
})
export class TvshowsService {
  private apiUrl = "https://api.themoviedb.org/3";
  private apiKey = "57b699211123b3ce9e79bf593bf60982";

  constructor(private http: HttpClient) {}

  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<TvShowsDataTypeObject>(
        `${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, count)));
  }
}
