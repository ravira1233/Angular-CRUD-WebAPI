import { Component, Inject, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../service/employee.service';
import { IEmployeeModel } from '../../Model/EmployeeModel';
import { ActivatedRoute, Router, RouterLinkActive, Routes } from '@angular/router';
import { stringify } from 'node:querystring';



@Component({
  selector: 'app-createemployee',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './createemployee.component.html',
  styleUrl: './createemployee.component.css'
})
export class CreateemployeeComponent {
  formbuild = inject(FormBuilder)
  router = inject(Router)
  route = inject(ActivatedRoute)
  employeedata?: IEmployeeModel
  btnName: string = "Add Employee"
  isEdit: boolean = false
  employeeForm = this.formbuild.group({
    Id: [0],
    Name: ['', [Validators.required]],
    Age: [0],
    Email: ['', [Validators.required]],
    PhoneNumber: ['', [Validators.required]],
    Salary: ['', [Validators.required]]
  });

  service = inject(EmployeeService)


  Save() {

    if (this.isEdit) {
      console.log('edit')
      this.employeedata = {
        Email: this.employeeForm.value.Email!,
        phone: this.employeeForm.value.PhoneNumber!,
        salary: this.employeeForm.value.Salary!,
        Name: this.employeeForm.value.Name!,
        Age: this.employeeForm.value.Age!,
        Id: this.route.snapshot.params['id']
      }

      this.service.UpdateEmployee(this.employeedata).subscribe(() => {
        console.log('Update success')
        this.router.navigateByUrl("/employee-list")
      }, error => {
        console.log(error)
      })

    }
    else {
      this.employeedata = {
        Email: this.employeeForm.value.Email!,
        phone: this.employeeForm.value.PhoneNumber!,
        salary: this.employeeForm.value.Salary!,
        Name: this.employeeForm.value.Name!,
        Age: this.employeeForm.value.Age!,
        Id: 0

      }
      this.service.SaveEmployee(this.employeedata).subscribe(() => {
        console.log('success')
        this.router.navigateByUrl("/employee-list")
      }, error => {
        console.log(error)
      })
    }


  }
  ngOnInit() {
    const employeeId = this.route.snapshot.params['id'];
    if (employeeId) {
      this.isEdit = true;
      this.btnName = "Update Employee";
      this.service.GetEmployee(employeeId).subscribe(
        (result: IEmployeeModel) => {
          this.employeeForm.patchValue({
            Id: result.Id,
            Name: result.Name ?? '',
            Age: result.Age,
            Email: result.Email,
            PhoneNumber: result.phone,
            Salary: result.salary
          });
        },
        error => {
          console.error('Error fetching employee data:', error);
        }
      );
  }
}

}
