import { Component, inject, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmailValidator, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../service/employee.service';
import { ILoginModel } from '../../Model/LoginModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginrequest?: ILoginModel
      
  formBuilde = inject(FormBuilder)
  loginForm = this.formBuilde.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required]]
  })
  service = inject(EmployeeService)
  router = inject(Router)
  Login() {

    this.loginrequest = {
      Email: this.loginForm.value.Email!,
      Password: this.loginForm.value.Password!

    }

    this.service.Login(this.loginrequest).subscribe((e) => {
      console.log('Success',e.token);
      localStorage.setItem('token',e.token)
      this.router.navigateByUrl('/employee-list')
    
    }, error => {
      console.log('error', error);
    })
  }

  ngOnInit()
  {
   
  }
}
