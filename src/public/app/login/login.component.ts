import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;

  private showProgressBar: boolean;
  private progressBarMode: string;
  private progress: number;
  private progressBarColor: string;

  private message: string;
  private messageType: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {
    this.showProgressBar = false;
    this.progressBarMode = 'indeterminate';
    this.progress = 100;
    this.progressBarColor = 'primary';
  }

  ngOnInit() { }

  invalidField(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return form.submitted && (control.value === undefined || control.value.length < 1);
  }

  login() {
    let validForm: boolean = this.username !== undefined && this.password !== undefined;
    validForm = validForm && (this.username.length > 0) && (this.password.length > 0);
    if (!validForm) {
      return;
    }
    this.showProgressBar = true;
    this.loginService.login(this.username, this.password).subscribe(
      res => {
        this.showProgressBar = false;
        this.message = undefined;

        this.router.navigate(['/dashboard']);
      },
      error => {
        this.progressBarColor = 'accent';
        this.progressBarMode = 'determinate';

        if (error.status === 401) {
          this.message = 'Invalid username or password';
        } else {
          this.message = 'An error occurred. Try again.';
        }
        this.messageType = 'error';
      }
    );
  }

}
