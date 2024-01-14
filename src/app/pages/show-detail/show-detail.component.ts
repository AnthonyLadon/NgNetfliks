import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { IMAGES_SIZES } from "src/app/constants/images-sizes";
import { MoviesService } from "src/app/services/movies.service";
import { TvshowsService } from "src/app/services/tvshows.service";
import { Movie } from "src/app/types/movie";
import { Video } from "src/app/types/video";
import { Image } from "src/app/types/image";
import { Actor } from "src/app/types/cast";
import { map } from "rxjs/operators";
import { mapToMovies, mapToMovie } from "../../types/tvshows";

@Component({
  selector: "app-show-detail",
  templateUrl: "./show-detail.component.html",
  styleUrls: ["./show-detail.component.scss"],
})
export class ShowDetailComponent implements OnInit {
  showId = "";
  showType: "tv" | "movie" = "movie";

  show$: Observable<Movie> | null = null;
  showVideos$: Observable<Video[]> | null = null;
  showImages$: Observable<Image[]> | null = null;
  showCast$: Observable<Actor[]> | null = null;
  similarMovies$: Observable<Movie[]> | null = null;

  imagesSizes = IMAGES_SIZES;

  // ActivatedRoute is a service that gives us access to the current route
  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService
  ) {}

  ngOnInit() {
    // observe the route params for changes and update the showId property
    this.router.params.subscribe((params) => {
      this.showId = params["id"];
      this.showId = this.router.snapshot.params["id"];
      if (this.showType === "movie") {
        this.show$ = this.moviesService.getMovieById(this.showId);
        this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
        this.showImages$ = this.moviesService.getMovieImages(this.showId);
        this.showCast$ = this.moviesService.getMovieCast(this.showId);
        this.similarMovies$ = this.moviesService.getSimilarMovies(this.showId);
      }

      if (this.showType === "tv") {
        this.show$ = this.tvshowsService
          .getTvShowById(this.showId)
          .pipe(map(mapToMovie));
        this.showVideos$ = this.tvshowsService.getTvShowVideos(this.showId);
        this.showImages$ = this.tvshowsService.getTvShowImages(this.showId);
        this.showCast$ = this.tvshowsService.getTvShowCast(this.showId);
        this.similarMovies$ = this.tvshowsService
          .getSimilarTvShows(this.showId)
          .pipe(map(mapToMovies));
      }
    });

    // Ou récupération de l'id de la série ou du film passée dans l'url (voir routing module)
    this.showId = this.router.snapshot.params["id"];
    // récupération du type de la série ou du film passée dans l'url
    this.showType = this.router.snapshot.params["type"];

    if (this.showType === "movie") {
      this.show$ = this.moviesService.getMovieById(this.showId);
      this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
      this.showImages$ = this.moviesService.getMovieImages(this.showId);
      this.showCast$ = this.moviesService.getMovieCast(this.showId);
      this.similarMovies$ = this.moviesService.getSimilarMovies(this.showId);
    }

    if (this.showType === "tv") {
      this.show$ = this.tvshowsService
        .getTvShowById(this.showId)
        .pipe(map(mapToMovie));
      this.showVideos$ = this.tvshowsService.getTvShowVideos(this.showId);
      this.showImages$ = this.tvshowsService.getTvShowImages(this.showId);
      this.showCast$ = this.tvshowsService.getTvShowCast(this.showId);
      this.similarMovies$ = this.tvshowsService
        .getSimilarTvShows(this.showId)
        .pipe(map(mapToMovies));
    }
  }
}
