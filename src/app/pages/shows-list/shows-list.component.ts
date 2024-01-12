import { Component, OnInit } from "@angular/core";
import { PaginatorState } from "primeng/paginator";
import { Observable } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { Movie, MovieDataTypeObject } from "src/app/types/movie";

@Component({
  selector: "app-shows-list",
  templateUrl: "./shows-list.component.html",
  styleUrls: ["./shows-list.component.scss"],
})
export class ShowsListComponent implements OnInit {
  isLoading = false;
  showsList$: Observable<MovieDataTypeObject> | null = null;
  searchValue: string = ""; // data binding (search input)
  first: number = 0;
  rows: number = 20;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getPagedShows(1);
  }

  getPagedShows(page: number, searchString?: string) {
    this.isLoading = true;
    this.showsList$ = this.moviesService.searchMovies(page, searchString);
    this.isLoading = false;
  }

  searchValueChanged() {
    this.getPagedShows(1, this.searchValue);
  }

  pageHasChanged(event: PaginatorState) {
    // on s'assure que event.page est bien défini (ajout +1 car API commence à 0)
    let pageNumber = event.page ? event.page + 1 : 1;
    // limiter pageNumber à 500 max (limite API)
    pageNumber > 500 ? (pageNumber = 500) : pageNumber;
    this.getPagedShows(pageNumber, this.searchValue);
    this.first = (pageNumber - 1) * this.rows;
    // mise à jour de first pour que le paginator (current page) soit bien positionné
  }
}
