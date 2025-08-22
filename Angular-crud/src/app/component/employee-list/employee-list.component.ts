import { Component, inject,ChangeDetectionStrategy } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { IEmployeeModel } from '../../Model/EmployeeModel';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink,MatDialogActions,MatDialogClose,MatDialogContent,MatDialogTitle],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'salary', 'phone', 'Action'];
  service = inject(EmployeeService)
  employeeList: IEmployeeModel[] = [];
  rout = inject(Router)
  readonly dialog = inject(MatDialog);
  ngOnInit() {
   this.GetAllEmployee();
  }

  GetAllEmployee()
  {
    this.service.GetAllEmployee().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList)
    }, error => {
      console.log(this.employeeList)
    })
  }
  Edit(id: number) {
    console.log(id)
    this.rout.navigateByUrl("/Edit/" + id)
  }

  openDialog(id: number)
  {
    this.service.DeleteEmployee(id).subscribe(()=>{
      this.employeeList=this.employeeList.filter(id=>!id.Id)
      this.GetAllEmployee();
    })

  }
}


