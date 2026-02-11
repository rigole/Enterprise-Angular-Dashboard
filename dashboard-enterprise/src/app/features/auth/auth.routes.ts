import { Routes } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";


export const usersRoutes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('./components/sign-in/sign-in.component')
            .then((m) => m.SignInComponent)
    },
    {
        path: 'add-employee',
        loadComponent: () => import('./components/add-employee/add-employee.component')
            .then((m) => m.AddEmployeeComponent)
    }
]

