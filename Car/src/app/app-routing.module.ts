import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        //canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/home'
            },
            {
                path: 'home',
                component: HomeComponent,
                data: {
                    title: 'Home page'
                }
            },
            {
                path: '**',
                component: NotFoundComponent,
                data: {
                    title: 'Home page'
                }
            }
        ]
    }
];

export const AppRoutingModule = RouterModule.forRoot(routes);