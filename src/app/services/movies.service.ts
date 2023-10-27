import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
// ajouter le service manuellement dans app.modules.ts -> providers
// au lieu de le faire automatiquement avec providedIn: "root"
// {providedIn: "root",}
export class MoviesService {
  constructor(private http: HttpClient) {}

  getPopularMovies() {
    return this.http.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=57b699211123b3ce9e79bf593bf60982"
    );
  }
}
