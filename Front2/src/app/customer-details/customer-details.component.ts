import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../entity/Customer';
import { Sale } from '../entity/Sale';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  id: string | null = null;
  sales: Sale[] = [];
  customer: Customer = new Customer();
  page: number = 0;
  totalPage: number[] = [];
  totalSales: number = 0;
  totalPoints: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.loadCustomerDetails();
      this.loadCustomerSales();
    });
  }

  loadCustomerDetails() {
    if (this.id) {
      this.apiService.getCustomerDetails(this.id)
        .then(response => {
          this.customer = response;
        })
    }
  }

  loadCustomerSales(page = 1) {
    if (this.id) {
      this.apiService.getCustomerSales(this.id, page)
        .then(response => {
          this.sales = response.data;
          this.page = response.page;
          this.totalPage = [];
          for(let i = 1; i <= response.total_pages; i++){
            this.totalPage.push(i);
          }
        })
    }
  }

}
