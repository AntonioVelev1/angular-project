import { Component, Input, OnInit } from '@angular/core';
import { IProblem } from 'src/app/shared/interfaces';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-all-problem',
  templateUrl: './all-problem.component.html',
  styleUrls: ['./all-problem.component.css']
})
export class AllProblemComponent implements OnInit {

  isLoading = false;
  problem: IProblem;
  problemList: IProblem[];

  constructor(private problemService: ProblemService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.problemService.allProblems().subscribe(problemList => {
      this.isLoading = false;
      this.problemList = problemList;
    });
  }

  deleteProblem(problemId): void {
    this.isLoading = true;
    if (confirm('Are you sure you want delete this problem?')) {
      this.problemService.deleteProblem(problemId).subscribe({
        next: () => {
          this.isLoading = false;
          window.location.reload();
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    }
    this.isLoading = false;

  }
 

}
