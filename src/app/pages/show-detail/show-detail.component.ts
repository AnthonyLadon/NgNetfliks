import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { IMAGES_SIZES } from "src/app/constants/images-sizes";
import { MoviesService } from "src/app/services/movies.service";
import { Movie } from "src/app/types/movie";

@Component({
  selector: "app-show-detail",
  templateUrl: "./show-detail.component.html",
  styleUrls: ["./show-detail.component.scss"],
})
export class ShowDetailComponent implements OnInit {
  showId = "";
  show$: Observable<Movie> | null = null;
  imagesSizes = IMAGES_SIZES;

  // ActivatedRoute is a service that gives us access to the current route
  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    // obersve the route params for changes and update the showId property

    // this.router.params.subscribe((params) => {
    //   this.showId = params["id"];
    // });

    // or we can use snapshot to get the current value of the route param
    this.showId = this.router.snapshot.params["id"];

    // récupération du film par son id
    this.show$ = this.moviesService.getMovieById(this.showId);
  }
}
