import { Component } from "@angular/core";
import { MoviesService } from "./../../services/movies.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  // creation d'une variable upcomingMovies$ qui va contenir les données de la requete getUpcomingMovies() du service moviesService
  upcomingMovies$ = this.moviesService.getUpcomingMovies();
  topRatedMovies$ = this.moviesService.getTopRatedMovies();

  // injection du service moviesService dans le constructeur
  constructor(private moviesService: MoviesService) {}
}
