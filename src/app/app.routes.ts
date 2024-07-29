import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ViewApplicationComponent } from './components/view-application/view-application.component';

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        pathMatch: "full",
    },
    {
        path: "admin-login",
        component: LoginComponent,
        // children: [
        //     {
        //         path: "view-application",
        //         component: ViewApplicationComponent
        //     }
        // ]
    },
    {
        path: "application-form",
        component: ApplicationFormComponent
    },
    {
        path: "view-form",
        component: ViewApplicationComponent,
    },
    {
        path: 'edit-application/:index',
        component: ApplicationFormComponent,

    },


];
