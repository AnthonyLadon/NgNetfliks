import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { Genre, Movie } from "src/app/types/movie";
import { OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PaginatorState } from "primeng/paginator";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.scss"],
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;
  shows$: Observable<Movie[]> | null = null;
  genreId = "";
  rows: number = 20;
  first: number = 0;
  total_records: number = 100;

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.genreId = params["genreId"];
      this.shows$ = this.movieService.getMoviesByGenre(this.genreId, 1);
    });
    this.genres$ = this.movieService.getMoviesGenres();
  }

  pageHasChanged(event: PaginatorState) {
    let pageNumber = event.page ? event.page + 1 : 1;
    this.first = (pageNumber - 1) * this.rows;
    // limiter pageNumber à 500 max (limite API)
    pageNumber > 500 ? (pageNumber = 500) : pageNumber;
    this.shows$ = this.movieService.getMoviesByGenre(this.genreId, pageNumber);
    this.movieService
      .getMoviesByGenre(this.genreId)
      .subscribe((data) => (this.total_records = data.length));
    console.log(this.total_records);
  }
}
