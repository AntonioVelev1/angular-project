import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  submitFormHandler(data: any): void {
    this.userService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
