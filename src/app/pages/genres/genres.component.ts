import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { Genre } from "src/app/types/movie";
import { OnInit } from "@angular/core";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.scss"],
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.genres$ = this.movieService.getMoviesGenres();
  }

  findByGenre(genreId: number) {}
}
