import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private problemService: ProblemService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitFormHandler(data: any): void {
    this.problemService.createProblem(data).subscribe({
      next: () => {
        this.router.navigate(['/problem/all']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
