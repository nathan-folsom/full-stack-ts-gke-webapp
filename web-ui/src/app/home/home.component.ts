import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ApolloQueryResult} from "@apollo/client/core";
import {User} from "../model/user";
import {Observable} from "rxjs";

const defaultAccountInputs = {username: '', password: '', confirmPassword: ''};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<ApolloQueryResult<{ user: User }>>
  createAccountInputs;
  loginInputs;
  passwordError = '';

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.service.getUser().valueChanges;
    this.resetInputs()
  }

  createAccount = () => {
    if (this.createAccountInputs.confirmPassword === this.createAccountInputs.password) {
      this.service.createUser(this.createAccountInputs.username, this.createAccountInputs.password);
      this.createAccountInputs = defaultAccountInputs;
      this.passwordError = '';
    } else {
      this.passwordError = 'Passwords do not match!';
    }
  }

  logIn = () => {
    this.service.logIn(this.loginInputs.username, this.loginInputs.password);
    this.loginInputs = defaultAccountInputs;
  }

  resetInputs = () => {
    this.createAccountInputs = {...defaultAccountInputs};
    this.loginInputs = {...defaultAccountInputs};
  }

  logout = () => {
    this.service.logOut();
  }

}
