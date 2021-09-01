import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Userup } from '../shared/userup.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: any;
  showSucessMessage!: boolean;
  updateMessage!: string;

  constructor(private userService: UserService, private router: Router) { }

  model = {
    email: '',
    fullName: ''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res['user'];
      },
      err => { }
    );
  }

  // Update user details
  onSubmit(form: NgForm) {
    var userUpdate: Userup = { email: form.controls.email.value, fullName: form.controls.fullName.value };
    this.userService.updateUserProfile(userUpdate).subscribe(
      res => {
        this.updateMessage = res;
        this.showMessage();

      },
      err => {
        this.updateMessage = "Something error to update your details..";
        this.showMessage();
      }
    );
  }

  // Show Message success
  showMessage() {
    this.showSucessMessage = true;
    setTimeout(() => this.showSucessMessage = false, 4000);
  }

  // Logout User
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
