import { Routes } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";


export const usersRoutes: Routes = [
    {
        path: 'sign-in',
        loadComponent: () => import('./components/sign-in/sign-in.component')
        .then((m) => m.SignInComponent)
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./components/sign-up/sign-up.component')
        .then((m) => m.SignUpComponent)
    }
]

