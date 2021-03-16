import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BallotComponent } from './ballot/ballot.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { FeedComponent } from './feed/feed.component';
import { OfficialsComponent } from './officials/officials.component';


const routes: Routes = [
  { path: 'candidate/:id', component: CandidateProfileComponent},
  { path: 'feed', component: FeedComponent },
  { path: 'ballot', component: BallotComponent },
  { path: 'officials', component: OfficialsComponent },
  { path: '**', component: FeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
