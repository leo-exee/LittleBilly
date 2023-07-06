import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../entity/Customer';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-customers-dashboard',
  templateUrl: './customers-dashboard.component.html',
  styleUrls: ['./customers-dashboard.component.css']
})
export class CustomersDashboardComponent implements OnInit {

  customers: Customer[] = [];
  searchForm: FormGroup;

  constructor(private apiService: ApiService) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    this.searchForm.get('searchInput')?.valueChanges.subscribe(value => {
      if (this.searchForm.valid) {
        this.getCustomersByName(value);
      } else if (value === null || value === '') {
        this.getCustomers();
      }
    });
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.apiService.getCustomers()
      .subscribe((response: Customer[]) => {
        this.customers = response;
      });
  }

  getCustomersByName(search: string) {
    this.apiService.getCustomersByName(search)
      .subscribe((response: Customer[]) => {
        this.customers = response;
      });
  }
}
