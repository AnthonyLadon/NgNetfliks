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
  showsList$: Observable<MovieDataTypeObject> | null = null;
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

  pageHasChanged(event: PaginatorState) {
    // on s'assure que event.page est bien défini
    // si oui, on ajoute 1 à event.page (car l'API commence à 0)
    // si non, on met 1 par défaut
    const pageNumber = event.page ? event.page + 1 : 1;
    this.getPagedShows(pageNumber, this.searchValue);
  }
}
