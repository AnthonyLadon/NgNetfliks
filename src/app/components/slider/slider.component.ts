import {
  trigger,
  state,
  transition,
  style,
  animate,
} from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { imageBaseUrl } from "../../constants/images-sizes";
import { Movie } from "src/app/types/movie";

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
  @Input() slides: Movie[] = [];
  // Input permettant de savoir si le slider doit se comporter comme un header ou non
  @Input() isHeader = false;

  constructor() {}

  sliderIndex = 0;
  imageBaseUrl = imageBaseUrl;

  ngOnInit() {
    // Si le slider n'est pas un header, on lance le changement de slide
    if (!this.isHeader) {
      this.changeSlide();
    }
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
