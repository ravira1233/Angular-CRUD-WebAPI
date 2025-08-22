import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeModel } from '../Model/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  serviceEmployee = inject(HttpClient)
  apiUrl: string = "http://localhost:5119/api/"

 SaveEmployee(employee: IEmployeeModel) : Observable<any>
  {
  return this.serviceEmployee.get(this.apiUrl + employee);
  }
}
