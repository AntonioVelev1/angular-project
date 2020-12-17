import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProblem } from 'src/app/shared/interfaces';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  errorMessege = '';
  isLoading = false;

  problem: IProblem | null;

  constructor(
    private problemService: ProblemService,
    activatedRoute: ActivatedRoute,
    private router: Router

  ) {
    const id = activatedRoute.snapshot.params.id;
    problemService.details(id).subscribe(problem => {
      this.problem = problem;
    })
  }

  ngOnInit(): void {

  }

  editProblemHandler(data): void {
    this.isLoading = true;
    this.errorMessege = '';
    this.problemService.editProblem({ problemId: this.problem._id, formData: data }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/car/details/', this.problem._id]);
      },
      error: (err) => {
        this.errorMessege = err.message;
      }
    })
  }
}

