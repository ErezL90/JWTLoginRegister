import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public showSucessMessage!: boolean;
  public serverErrorMessage!: string;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  //Try to Register user:
  onSubmit(form: NgForm) {
    debugger
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 8000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessage = err.error.join('<br/>');
        } else {
          this.serverErrorMessage = 'Something went wrong. Please contact admin.';
        }

      }
    );
  }

  // Reset all form
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      birthdate: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessage = '';
  }

}
