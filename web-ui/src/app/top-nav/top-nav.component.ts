import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import {User} from "../model/user";
import {AuthService} from "../data-services/auth/auth.service";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {map, startWith, tap} from "rxjs/operators";

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
