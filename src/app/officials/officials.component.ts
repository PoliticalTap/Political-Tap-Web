import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-officials',
  templateUrl: './officials.component.html',
  styleUrls: ['./officials.component.css']
})

export class OfficialsComponent implements OnInit {
  officials: any;
  noZip = true;
  loading = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.getOfficials();
  }
  
  toggleAccordian(event, index) {
      var element = event.target;
      var panel = element.nextElementSibling;

      element.classList.toggle("active");
      this.officials[index].isActive = !this.officials[index].isActive;

      panel.hidden = !panel.hidden;
  }

  getOfficials() {
    var zip = sessionStorage.getItem('zip');
    
    if(zip)
    {
      this.noZip = false;
      this.loading = true;
    }

    this.candidateService.getOfficialsList(sessionStorage.getItem('zip'))
      .subscribe(officials => 
      {
        this.officials = officials;
        this.loading = false;
        console.log(this.officials);
      }
    );
  }

}
