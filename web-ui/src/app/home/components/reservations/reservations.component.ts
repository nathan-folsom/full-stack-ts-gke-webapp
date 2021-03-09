import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  showCreate = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowCreate = () => this.showCreate = !this.showCreate;

}
