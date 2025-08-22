import { Routes } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { CreateemployeeComponent } from './component/createemployee/createemployee.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {
        component: LoginComponent,
        path: ""
    },
    {
        component: EmployeeListComponent,
        path: "employee-list"
    },
    {
        component:CreateemployeeComponent,
        path:"create",
        
    },
    {
        component:CreateemployeeComponent,
        path:"Edit/:id"
    },
    {
        component: LoginComponent,
        path: "login",


    }
];
