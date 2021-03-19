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
  voteHistory;
  socialMediaLinks;

  tweetsLoading = true;

  isBioHidden = false;
  isTwitterHidden = true; 
  isVotesHidden = true;

  socialMediaIcons = {
    "twitter" : "fab fa-twitter-square",
    "facebook": "fab fa-facebook-square",
    "instagram" : "fab fa-instagram-square",
    "youtube" : "fab fa-youtube",
    "linkedin" : "fab fa-linkedin",
  };

  constructor(private route: ActivatedRoute,
    private candidateService : CandidateService) { 
  }

  ngOnInit(): void {
    this.candidate_id = this.route.snapshot.paramMap.get("id");
    this.getCandidate(this.candidate_id);
    this.getCandidateTweets(this.candidate_id);
    this.getCandidateVoteHistory(this.candidate_id);

    this.getCandidateSocialMediaLinks(this.candidate_id);
  }

  getCandidateSocialMediaLinks(candidateId) {
    this.candidateService.getSocialMediaLinks(candidateId)
      .subscribe(socialMediaLinks => {
        console.log(socialMediaLinks);
        this.socialMediaLinks = socialMediaLinks;
      });
  }

  getCandidate(candidateId) {
    this.candidateService.getCandidateProfile(candidateId)
      .subscribe(candidateBio => {
        this.candidate = candidateBio;
        console.log(this.candidate);
      });
  }

  toggleAccordian(event) {
    var element = event.target;
    var panel = element.nextElementSibling;

    element.classList.toggle("active");

    panel.hidden = !panel.hidden;
  }

  getCandidateTweets(candidateId) {
    this.candidateService.getCandidateTweets(candidateId)
      .subscribe(tweets => {
        this.candidateTweets = tweets;
        this.tweetsLoading = false;
      });
  }
  
  getCandidateVoteHistory(candidateId) {
    this.candidateService.getCandidateVoteHistory(candidateId)
      .subscribe(voteHistory => {
        this.voteHistory = voteHistory;
        console.log(this.voteHistory);
      });
  }

  changeTab(event): void {
    var element = event.target.textContent;

    this.isBioHidden = element !== "Bio";
    this.isTwitterHidden = element !== "Twitter";
    this.isVotesHidden = element != "Votes";
  }
  
  // Use Array.isArray in NGIF
  isArray(comparator) {
    return Array.isArray(comparator);
  }
}
