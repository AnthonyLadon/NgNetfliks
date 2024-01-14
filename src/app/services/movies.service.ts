import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  MovieDataTypeObject,
  Movie,
  GenreDataTypeObject,
} from "../types/movie";
import { map } from "rxjs";
import { VideoDataTypeObject } from "../types/video";
import { ImageDataTypeObject } from "../types/image";
import { CreditsDataTypeObject } from "../types/cast";

@Injectable()
// ajouter le service manuellement dans app.modules.ts -> providers
// au lieu de le faire automatiquement avec providedIn: "root" {providedIn: "root",}
export class MoviesService {
  private apiUrl = "https://api.themoviedb.org/3";
  private apiKey = "57b699211123b3ce9e79bf593bf60982";
  constructor(private http: HttpClient) {}

  getMoviesByType(type: string, count = 20) {
    return this.http
      .get<MovieDataTypeObject>(
        `${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, count)));
    // pipe permet de modifier le flux de données (RxJS)
    // -> ici on ne garde que le tableau results
    // count limite le nombre de films à 20 (par défaut)
  }

  getMovieById(id: string) {
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  getMovieVideos(id: string) {
    return this.http
      .get<VideoDataTypeObject>(
        `${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results));
  }

  getMovieImages(id: string) {
    return this.http
      .get<ImageDataTypeObject>(
        `${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.backdrops));
  }

  getMovieCast(id: string) {
    return this.http
      .get<CreditsDataTypeObject>(
        `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.cast));
  }

  getSimilarMovies(id: string, count = 12) {
    return this.http
      .get<MovieDataTypeObject>(
        `${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.results.slice(0, count)));
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? "search/movie" : "movie/popular";
    // si searchValue est défini, on utilise l'URI de recherche
    // sinon par defaut on va chercher films populaires
    return this.http.get<MovieDataTypeObject>(
      `${this.apiUrl}/${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
    );
  }

  getMoviesGenres() {
    return this.http
      .get<GenreDataTypeObject>(
        `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`
      )
      .pipe(map((data) => data.genres));
  }
}
