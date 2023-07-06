import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersDashboardComponent} from "./customers-dashboard/customers-dashboard.component";
import {CustomerDetailsComponent} from "./customer-details/customer-details.component";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    component: CustomersDashboardComponent
  },
  {
    path: 'details/:id',
    component: CustomerDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
