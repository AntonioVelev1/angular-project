import { RouterModule, Routes } from '@angular/router';
import { AllProblemComponent } from './all-problem/all-problem.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
    {
        path: 'problem',
        children: [
            {
                path: 'create',
                component: CreateComponent
            },
            {
                path: 'all',
                component: AllProblemComponent
            }
        ]
    }
];

export const ProblemRoutingModule = RouterModule.forChild(routes);