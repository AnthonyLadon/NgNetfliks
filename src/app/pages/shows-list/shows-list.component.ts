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
  searchValue: string = ""; // data binding (search input)

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedShows(1);
  }

  getPagedShows(page: number, searchString?: string) {
    this.showsList$ = this.moviesService.searchMovies(page, searchString);
  }

  searchValueChanged() {
    this.getPagedShows(1, this.searchValue);
  }
}
