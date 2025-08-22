import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployeeModel } from '../Model/EmployeeModel';
import { pseudoRandomBytes } from 'crypto';
import { ILoginModel } from '../Model/LoginModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  serviceEmployee = inject(HttpClient)
  apiUrl: string = "http://localhost:5119/api/"
  constructor() { }

  GetAllEmployee() {
    return this.serviceEmployee.get<IEmployeeModel[]>(this.apiUrl + "Employees")
  }

  SaveEmployee(employee:IEmployeeModel)
  {
    return this.serviceEmployee.post(this.apiUrl + "Employees",employee);
  }

  UpdateEmployee(employee:IEmployeeModel)
  {
    return this.serviceEmployee.put(this.apiUrl + "Employees",employee);
  }

  GetEmployee(id:number):Observable<IEmployeeModel>
  {
    return this.serviceEmployee.get<IEmployeeModel>(this.apiUrl + "Employees/"+id);
  }

  DeleteEmployee(id:number):Observable<IEmployeeModel>
  {
    return this.serviceEmployee.delete<IEmployeeModel>(this.apiUrl + "Employees/"+id);
  }

  Login(login:ILoginModel)
  {
    console.log(this.apiUrl + "Authendicate/Login");
    return this.serviceEmployee.post<{token:string}>(this.apiUrl + "Authendicate/Login",login);
  }
}

