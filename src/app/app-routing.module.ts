import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BallotComponent } from './ballot/ballot.component';
import { FeedComponent } from './feed/feed.component';


const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'ballot', component: BallotComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
