import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { BallotComponent } from './ballot/ballot.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { NgxTweetModule } from "ngx-tweet";
import { FormsModule } from '@angular/forms';
import { OfficialsComponent } from './officials/officials.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    BallotComponent,
    CandidateProfileComponent,
    OfficialsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxTweetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
