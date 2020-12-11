import { Component, Input, OnInit } from '@angular/core';
import { IProblem } from 'src/app/shared/interfaces';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-all-problem',
  templateUrl: './all-problem.component.html',
  styleUrls: ['./all-problem.component.css']
})
export class AllProblemComponent implements OnInit {

  problemList: IProblem[];

  constructor(private problemService: ProblemService) { }

  ngOnInit(): void {
    this.problemService.allProblems().subscribe(problemList => {
      this.problemList = problemList;
    });
  }

}
