import { MoviesService } from "./../../services/movies.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  movies: any;
  constructor(private MoviesService: MoviesService) {}

  ngOnInit() {
    this.MoviesService.getPopularMovies().subscribe((data) => {
      this.movies = data;
    });
  }
}
