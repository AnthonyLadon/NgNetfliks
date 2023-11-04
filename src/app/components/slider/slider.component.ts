import {
  trigger,
  state,
  transition,
  style,
  animate,
} from "@angular/animations";
import { MoviesService } from "./../../services/movies.service";
import { Component, OnInit } from "@angular/core";
import { imageBaseUrl } from "../../constants/images-sizes";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
  animations: [
    trigger("slideFade", [
      state("void", style({ opacity: 0 })),
      transition("void <=> *", [animate("1s")]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  constructor(private MoviesService: MoviesService) {}

  movies$ = this.MoviesService.getMoviesByType("popular");
  // suffixe $ pour indiquer que c'est un observable

  sliderIndex = 0;
  imageBaseUrl = imageBaseUrl;

  ngOnInit() {
    this.changeSlide();
  }

  changeSlide() {
    setInterval(() => {
      this.sliderIndex++;
      if (this.sliderIndex > 10) {
        this.sliderIndex = 0;
      }
    }, 5000);
  }
}
