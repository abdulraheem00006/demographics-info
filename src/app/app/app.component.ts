import { Component, OnInit, OnDestroy } from "@angular/core";
import { Feature, LngLat, Map, MapGeoJSONFeature } from "maplibre-gl";
import { DataRetrievalService } from "./services/data-retrieval.service";
import { Subscription } from "rxjs";
import { MapLayerMouseEvent } from "maplibre-gl";
import {
  AVERAGE_INCOME_PROPERTY,
  INCOME_PAINT_FILL,
  INCOME_RANGES,
} from "./constants";

@Component({
  selector: "ratio-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  popupLocation: LngLat;
  geoData: GeoJSON.FeatureCollection<GeoJSON.Polygon>;
  subscription: Subscription;
  minIncome = Infinity;
  maxIncome = -Infinity;
  totalIncome = 0;
  averageIncome = 0;
  map: Map;
  selectedArea: GeoJSON.Feature | null;
  cursorStyle: string;
  paintFill = INCOME_PAINT_FILL;
  displayModal = true;
  averageIncomeProperty = AVERAGE_INCOME_PROPERTY;

  constructor(private dataRetrievalService: DataRetrievalService) {}

  ngOnInit(): void {
    this.subscription = this.dataRetrievalService.retrieveGeoJSON().subscribe(
      (data) => {
        this.geoData = data;
        this.calculateMetrics(this.geoData?.features);
      },
      (error) => {
        console.error("Error occurred while fetching data:", error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  calculateMetrics(features) {
    features?.forEach((obj) => {
      const income = obj?.properties[AVERAGE_INCOME_PROPERTY];
      this.minIncome = Math.round(Math.min(this.minIncome, income));
      this.maxIncome = Math.round(Math.max(this.maxIncome, income));
      this.totalIncome += income;
    });
    this.averageIncome = Math.round(this.totalIncome / features?.length);
  }

  getColorForIncome(selectedArea: any): string {
    const income = selectedArea?.properties[AVERAGE_INCOME_PROPERTY];
    if (!income || income < 0) return "";

    // Find the appropriate color based on the income range
    const range = this.sortedIncomes.find((range) => income >= range.value);
    return range ? range.color : "";
  }

  get sortedIncomes() {
    return INCOME_RANGES.slice().sort((a, b) => b.value - a.value);
  }

  onClick(evt: MapLayerMouseEvent) {
    this.selectedArea = evt.features![0];
    this.popupLocation = evt.lngLat;
    this.displayModal = true;
  }

  modalClose() {
    this.displayModal = false;
  }
}
