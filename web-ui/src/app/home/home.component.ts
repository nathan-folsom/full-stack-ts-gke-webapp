import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ApolloQueryResult} from "@apollo/client/core";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<ApolloQueryResult<{ getUser: User }>>
  loggedIn$: Observable<ApolloQueryResult<{ sessionIsActive: boolean }>>;
  accountInputs = {username: '', password: ''};

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.service.userIsLoggedIn()
    this.user$ = this.service.getUser()
  }

  createAccount = () => {
    this.service.createUser(this.accountInputs.username, this.accountInputs.password);
  }

  logIn = () => {
    this.service.logIn(this.accountInputs.username, this.accountInputs.password);
  }

}
