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

  constructor(private route: ActivatedRoute,
    private candidateService : CandidateService) { 
  }

  ngOnInit(): void {
    this.candidate_id = this.route.snapshot.paramMap.get("id");
    this.getCandidate();
  }

  getCandidate() {
    this.candidateService.getCandidateProfile(this.candidate_id)
      .subscribe(candidateBio => {
        this.candidate = candidateBio;
        console.log(this.candidate);
      });
  }

  toggleAccordian(event) {
    var element = event.target;
    var panel = element.nextElementSibling;

    element.classList.toggle("active");
    // this.data[index].isActive = !this.data[index].isActive;

    panel.hidden = !panel.hidden;
  }
}
