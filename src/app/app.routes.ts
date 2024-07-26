import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "application-form",
        // component:
    }
];
