import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomersDashboardComponent } from './customers-dashboard/customers-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from './components/navbar/navbar.component';
import {ApiService} from "./services/api.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "@auth0/auth0-angular";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    CustomersDashboardComponent,
    CustomerDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
  ],
  providers: [ApiService]
})
export class AppModule { }
