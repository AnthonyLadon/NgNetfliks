import { Component, OnInit } from "@angular/core";
import { MoviesService } from "./../../services/movies.service";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"],
})
export class BannerComponent implements OnInit {
  // creation d'une variable upcomingMovies$ qui va contenir les données de la requete getUpcomingMovies() du service moviesService
  upcomingMovies$ = this.moviesService.getUpcomingMovies();

  // injection du service moviesService dans le constructeur
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {}
}
