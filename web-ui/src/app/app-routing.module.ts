import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/components/home/home.component";
import {FriendsComponent} from "./friends/friends/friends.component";
import {SettingsComponent} from "./settings/settings.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
