import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ProblemRoutingModule } from './problem-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemService } from './problem.service';
import { AllProblemComponent } from './all-problem/all-problem.component';



@NgModule({
  declarations: [
    CreateComponent,
    AllProblemComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProblemService
  ],
  exports: [
    CreateComponent,
    AllProblemComponent
  ]
}) 
export class ProblemModule { }
