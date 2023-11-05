import { Component } from "@angular/core";
import { TvshowsService } from "./../../services/tvshows.service";
import { MoviesService } from "./../../services/movies.service";
import { map } from "rxjs";
import { MapToMovies } from "../../types/tvshows";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  popularMovies$ = this.moviesService.getMoviesByType("popular", 12);
  upcomingMovies$ = this.moviesService.getMoviesByType("upcoming", 12);
  topRatedMovies$ = this.moviesService.getMoviesByType("top_rated", 12);
  popularTvShows$ = this.tvshowService
    .getTvShowsByType("popular", 12)
    .pipe(map(MapToMovies));

  // injection du service moviesService et TvshowsService dans le constructeur
  constructor(
    private moviesService: MoviesService,
    private tvshowService: TvshowsService
  ) {}
}
