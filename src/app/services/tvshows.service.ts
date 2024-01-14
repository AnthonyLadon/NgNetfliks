import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { TvShowsDataTypeObject, mapToMovies } from "../types/tvshows";
import { ImageDataTypeObject } from "../types/image";
import { VideoDataTypeObject } from "../types/video";
import { CreditsDataTypeObject } from "../types/cast";
import { Tvshow } from "../types/tvshows";

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

  getTvShowById(id: string) {
    return this.http.get<Tvshow>(
      `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  getTvShowVideos(id: string) {
    return this.http
      .get<VideoDataTypeObject>(
        `${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }

  getTvShowImages(id: string) {
    return this.http
      .get<ImageDataTypeObject>(
        `${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.backdrops));
  }

  getTvShowCast(id: string) {
    return this.http
      .get<CreditsDataTypeObject>(
        `${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast));
  }

  getSimilarTvShows(id: string, count = 12) {
    return this.http
      .get<TvShowsDataTypeObject>(
        `${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, count)));
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? "search/tv" : "tv/popular";
    // si searchValue est défini, on utilise l'URI de recherche
    // sinon par defaut on va chercher films populaires
    return this.http.get<TvShowsDataTypeObject>(
      `${this.apiUrl}/${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
    );
  }
}
