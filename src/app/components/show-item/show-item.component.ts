import { imageBaseUrl } from "./../../constants/images-sizes";
import { Component, Input } from "@angular/core";
import { Movie } from "../../types/movie";

@Component({
  selector: "app-show-item",
  templateUrl: "./show-item.component.html",
  styleUrls: ["./show-item.component.scss"],
})
export class ShowItemComponent {
  // The @Input() decorator is used to make the showItem property available to the parent component.
  @Input() showItem: Movie | null = null;

  // récupération de l'url de base des images (import de la constante imageBaseUrl)
  imageBaseUrl = imageBaseUrl;
}
