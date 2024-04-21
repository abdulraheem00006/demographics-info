import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { DataRetrievalService } from './services/data-retrieval.service';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, BrowserModule, NgxMapLibreGLModule],
  bootstrap: [AppComponent],
  providers: [DataRetrievalService]
})
export class AppModule {}
