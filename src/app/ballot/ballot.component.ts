import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';


@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {
  zip = "45011";
  data: any;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.getCandidates();
  }

  toggleAccordian(event, index) {
      var element = event.target;
      var panel = element.nextElementSibling;

      element.classList.toggle("active");
      this.data[index].isActive = !this.data[index].isActive;

      panel.hidden = !panel.hidden;
  }

  getCandidates() {
    this.candidateService.getCandidatesByZip(sessionStorage.getItem('zip'))
      .subscribe(candidates => 
        {
          this.data = candidates; 
          console.log(this.data);
        }
      );
  }

}
