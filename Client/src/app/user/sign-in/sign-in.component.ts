import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  model = {
    email: '',
    password: ''
  };
  public showMessage!: boolean;
  public serverErrorMessage!: string;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    // Get User profile
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');

  }

  //Try to Login user:
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res: any) => {
        console.log(res['token'])
        this.userService.setToken(res.token);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        debugger;
        this.showMessage = true;
        if (!err.error.message)
          this.serverErrorMessage = "Error server";
        else
          this.serverErrorMessage = err.error.message;
        setTimeout(() => this.showMessage = false, 8000);
      });
  }

}
