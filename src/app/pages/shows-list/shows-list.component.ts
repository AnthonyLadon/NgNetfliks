import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { Movie } from "src/app/types/movie";

@Component({
  selector: "app-shows-list",
  templateUrl: "./shows-list.component.html",
  styleUrls: ["./shows-list.component.scss"],
})
export class ShowsListComponent implements OnInit {
  showsList$: Observable<Movie[]> | null = null;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.showsList$ = this.moviesService.searchMovies(1);
  }
}
