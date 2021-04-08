import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Friend, FriendRequestResponse} from "../../../../../graphql/graphql";
import {FriendService} from "../../data-services/friend/friend.service";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friends$: Observable<Friend[]>;
  usernameInput = new FormControl('');

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.friendService.fetchFriends();
    this.friends$ = this.friendService.getFriends().pipe(
      map(r => r.data.friends)
    )
  }

  sendRequest = () => {
    this.friendService.sendRequest(this.usernameInput.value);
    this.usernameInput.reset('');
  }
}
