import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  candidate_id: string;
  candidate: any;
  candidateTweets;

  isAboutActive: boolean = false;
  isTwitterFeedActive: boolean = true;
  isVotesActive: boolean = true;

  constructor(private route: ActivatedRoute,
    private candidateService : CandidateService) { 
  }

  ngOnInit(): void {
    this.candidate_id = this.route.snapshot.paramMap.get("id");
    this.getCandidate();
    this.getCandidateTweets();
  }

  getCandidate() {
    this.candidateService.getCandidateProfile(this.candidate_id)
      .subscribe(candidateBio => {
        this.candidate = candidateBio;
        console.log(this.candidate);
      });
  }

  getCandidateTweets() {
    this.candidateService.getCandidateTweets(this.candidate_id)
      .subscribe(tweets => {
        this.candidateTweets = tweets;
        console.log(this.candidateTweets);
      });
  }

  changeTab(event) : void {
    var element = event.target.textContent;

    this.isAboutActive = element !== "About";
    this.isTwitterFeedActive = element !== "Twitter Feed";
    this.isVotesActive = element !== "Votes";
  }
}
