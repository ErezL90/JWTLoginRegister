import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { User } from './user.model';
import { Userup } from './userup.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User | undefined = {
    fullName: '',
    email: '',
    birthdate: '',
    password: '',
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  // Http Methods to NodeJs Server

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  updateUserProfile(user: Userup) {
    return this.http.put(environment.apiBaseUrl + '/userUpdate', user,
    {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` }),
      responseType: 'text'
    });
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  // Function for the Token:
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  // Get User details:
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  // Check If User logged in.
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    else
      return false;
  }
}
