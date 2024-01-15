import { Component, OnInit } from "@angular/core";
import { PaginatorState } from "primeng/paginator";
import { Observable } from "rxjs";
import { MoviesService } from "src/app/services/movies.service";
import { TvshowsService } from "src/app/services/tvshows.service";
import { MovieDataTypeObject } from "src/app/types/movie";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { mapToMoviesDto } from "src/app/types/tvshows";

@Component({
  selector: "app-shows-list",
  templateUrl: "./shows-list.component.html",
  styleUrls: ["./shows-list.component.scss"],
})
export class ShowsListComponent implements OnInit {
  showsList$: Observable<MovieDataTypeObject> | null = null;
  showsType: "movie" | "tv" = "movie";
  isLoading = false;
  searchValue: string = ""; // data binding (search input)
  first: number = 0;
  rows: number = 20;

  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService,
    private activeRoute: ActivatedRoute // pour récupérer le parametre de l'url
  ) {}

  ngOnInit(): void {
    // observe the route params for changes and update the showsType property
    this.activeRoute.params.subscribe((params) => {
      this.showsType = params["type"];
      this.getPagedShows(this.showsType, 1);
    });
  }

  getPagedShows(
    showsType: "movie" | "tv",
    page: number,
    searchString?: string
  ) {
    this.isLoading = true;
    if (showsType === "tv") {
      setTimeout(() => {
        this.showsList$ = this.tvshowsService
          .searchTvShows(page, searchString)
          .pipe(map(mapToMoviesDto));
      }, 200);
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    }
    if (showsType === "movie") {
      this.isLoading = true;
      setTimeout(() => {
        this.showsList$ = this.moviesService.searchMovies(page, searchString);
      }, 200);
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    }
  }

  searchValueChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue);
  }

  pageHasChanged(event: PaginatorState) {
    // on s'assure que event.page est bien défini (ajout +1 car API commence à 0)
    let pageNumber = event.page ? event.page + 1 : 1;
    // limiter pageNumber à 500 max (limite API)
    pageNumber > 500 ? (pageNumber = 500) : pageNumber;
    this.getPagedShows(this.showsType, 1, this.searchValue);
    this.first = (pageNumber - 1) * this.rows;
    // mise à jour de first pour que le paginator (current page) soit bien positionné
  }
}
