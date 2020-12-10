import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitFormHandler(data: any): void {
    this.userService.login(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
