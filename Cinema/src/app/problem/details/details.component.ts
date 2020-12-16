import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { IProblem, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  isLoading = false;
  errorMessage = '';

  isOnEdit = false;
  commentToEdit = '';

  get isCreator(): boolean {
    return !!(this.problem.userId._id === this.userService.currentUser._id);
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  problem: IProblem | null;

  constructor(
    private problemService: ProblemService,
    private commentService: CommentService,
    private userService: UserService,
    activatedRoute: ActivatedRoute
  ) {
    const id = activatedRoute.snapshot.params.id;
    this.problemService.details(id).subscribe(problem => {
      this.problem = problem;
    })
  }

  ngOnInit(): void {
  }

  createCommentHandler(data): void {
    this.isLoading = true;
    this.commentService.createComment({ problemId: this.problem._id, userId: this.currentUser._id, text: data.text }).subscribe({
      next: () => {
        window.location.reload();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err.message);
      }
    })
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

  editComment(id): void {
    this.isOnEdit = true;
    this.commentToEdit = id;
  }

  editedCommentHandler(data): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.commentService.editComment({ commentId: data.commentId, user: this.userService.currentUser, content: data.newComment }).subscribe({
      next: () => {
        this.isLoading = false;
        this.isOnEdit = false;
        window.location.reload();
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log(err.message);
      }
    })
  }

  deleteComment(id): void {
    this.isLoading = true;
    this.errorMessage = '';
    if (confirm('Are you sure you want delete this comment?')) {
      this.commentService.deleteComment({ commentId: id, userId: this.userService.currentUser._id, problemId: this.problem._id }).subscribe({
        next: () => {
          this.isLoading = false;
          this.isOnEdit = false;
          window.location.reload();
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.log(err.message);
        }
      })
    }
  }
  
}
