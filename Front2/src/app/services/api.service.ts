import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Customer } from '../entity/Customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL de base de l'API

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    const url = `${this.apiUrl}/customers`;
    return this.http.get<Customer[]>(url);
  }

  getCustomersByName(search: string): Observable<Customer[]> {
    const url = `${this.apiUrl}/customer/lastname/${search}`;
    return this.http.get<Customer[]>(url);
  }

  getCustomerDetails(id: string): Promise<Customer> {
    const url = `${this.apiUrl}/customer/${id}`;
    return this.http.get(url).toPromise()
      .then(response => response as Customer)
  }

  getCustomerSales(id: string, page: number): Promise<any> {
    const url = `${this.apiUrl}/sales/${id}/${page}`;
    return this.http.get(url).toPromise();
  }
}
