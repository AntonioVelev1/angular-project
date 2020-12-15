import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ProblemRoutingModule } from './problem-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemService } from './problem.service';
import { AllProblemComponent } from './all-problem/all-problem.component';
import { SharedModule } from '../shared/shared.module';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { CommentModule } from '../comment/comment.module';



@NgModule({
  declarations: [
    CreateComponent,
    AllProblemComponent,
    EditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommentModule
  ],
  providers: [
    ProblemService
  ],
  exports: [
    CreateComponent,
    AllProblemComponent,
    EditComponent,
    DetailsComponent
  ]
}) 
export class ProblemModule { }
