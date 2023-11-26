import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-video-embed",
  templateUrl: "./video-embed.component.html",
  styleUrls: ["./video-embed.component.scss"],
})
export class VideoEmbedComponent implements OnInit {
  @Input() key: string | null = null;

  // definition de la variable videoUrl de type SafeResourceUrl (pour eviter les erreurs de securité)
  videoUrl: SafeResourceUrl = "";
  // DomSanitizer permet de securiser les url
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // on utilise la methode bypassSecurityTrustResourceUrl de DomSanitizer pour securiser l'url
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.key}`
    );
  }
}
