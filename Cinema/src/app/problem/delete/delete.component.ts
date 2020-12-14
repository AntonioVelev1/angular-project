import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProblem } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  isLoading = false;

  problem: IProblem = null;

  get currentUser(): boolean {
    return this.problem.userId._id === this.userService.currentUser._id;
  }

  constructor(
    private problemService: ProblemService,
    private userService: UserService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  deleteProblem(problemId: string): void {
    this.isLoading = true;
    this.problemService.deleteProblem(problemId).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['problem/all']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

}
