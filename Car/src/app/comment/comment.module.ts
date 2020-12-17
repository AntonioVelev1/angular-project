import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CommentService } from './comment.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers :[
    CommentService
  ]
})
export class CommentModule { }
