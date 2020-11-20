import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { TopBenefitsComponent } from './components/top-benefits/top-benefits.component';
import { GraphByCategoryComponent } from './components/graph-by-category/graph-by-category.component';
import { HomeComponent } from './pages/home/home.component';
import { NumberCardsComponent } from './components/number-cards/number-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBenefitsComponent,
    GraphByCategoryComponent,
    HomeComponent,
    NumberCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
