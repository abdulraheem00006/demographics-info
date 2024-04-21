import { Component, OnInit } from "@angular/core";
import { LngLatLike } from "maplibre-gl";
import { DataRetrievalService } from "./services/data-retrieval.service";
import { Subscription } from "rxjs";

@Component({
  selector: "ratio-app",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  popupLocation: LngLatLike;
  geoData: any;
  subscription: Subscription;

  constructor(private dataRetrievalService: DataRetrievalService) {}

  public ngOnInit() {
    this.subscription = this.dataRetrievalService.retrieveGeoJSON().subscribe(
      (data) => {
        console.log("Data received from end point - ");
        console.log(data);
      },
      (error) => {
        // Handle error messages to be displayed on component
        console.log("Error occured fetching data", error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
