import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { Genre, Movie } from "src/app/types/movie";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.scss"],
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<Movie[]> | null = null;
  genreId = "";

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreId = params["genreId"];
      this.shows$ = this.movieService.getMoviesByGenre(this.genreId);
    });
    this.genres$ = this.movieService.getMoviesGenres();
  }

  findByGenre(genreId: string) {
    // this.shows$ = this.movieService.getMoviesByGenre(genreId);
  }
}
