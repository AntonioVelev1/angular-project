import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'user',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: "login",
                component: LoginComponent,
                data: {
                    isLogged: false,
                    title: 'Login Page'
                }
            },
            {
                path: "register",
                component: RegisterComponent,
                data: {
                    isLogged: false,
                    title: 'Register Page'
                }
            },
            {
                path: "profile",
                component: ProfileComponent,
                data: {
                    isLogged: true,
                    title: 'Profile'
                }
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);