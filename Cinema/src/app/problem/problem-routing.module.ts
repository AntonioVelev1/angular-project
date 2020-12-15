import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AllProblemComponent } from './all-problem/all-problem.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    {
        path: 'problem',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'create',
                component: CreateComponent,
                data: {
                    isLogged: true,
                    title: 'Create Problem'
                }
            },
            {
                path: 'all',
                component: AllProblemComponent,
                data: {
                    isLogged: true,
                    title: 'All Problem'
                }
            },
            {
                path: 'details/:id',
                component: DetailsComponent,
                data: {
                    isLogged: true,
                    title: 'Details Problem'
                }
            },
            {
                path: 'edit/:id',
                component: EditComponent,
                data: {
                    isLogged: true,
                    title: 'Edit Problem'
                }
            }
        ]
    }
];

export const ProblemRoutingModule = RouterModule.forChild(routes);