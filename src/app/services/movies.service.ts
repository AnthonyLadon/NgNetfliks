import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MovieDataTypeObject } from "../types/movie";

@Injectable()
// ajouter le service manuellement dans app.modules.ts -> providers
// au lieu de le faire automatiquement avec providedIn: "root"
// {providedIn: "root",}
export class MoviesService {
  private apiUrl = "https://api.themoviedb.org/3";
  private apiKey = "57b699211123b3ce9e79bf593bf60982";
  constructor(private http: HttpClient) {}

  getPopularMovies() {
    return this.http.get<MovieDataTypeObject>(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}`
    );
  }
}
