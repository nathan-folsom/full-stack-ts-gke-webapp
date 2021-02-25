import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import {User} from "../model/user";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  user$: Observable<ApolloQueryResult<{ user: User }>>;

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.service.getUser().valueChanges;
  }

  logout = () => {
    this.service.logOut();
  }

}
