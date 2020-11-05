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

  // data: any =
  //   [
  //     {
  //       "election": "2020 Presidential Candidates",
  //       "candidates":
  //         [
  //           { 
  //             "name": "Donald Trump",
  //             "description": "Republican",
  //             "img": "https://pbs.twimg.com/profile_images/642874438250160128/_C3bMOHQ.jpg" 
  //           },
  //           { 
  //             "name": "Joe Biden",
  //             "description": "Democrat",
  //             "img": "https://img.thedailybeast.com/image/upload/dpr_2.0/c_crop,h_1440,w_1440,x_424,y_0/c_limit,w_128/d_placeholder_euli9k,fl_lossy,q_auto/v1548298902/mt_lhki3a" 
  //           }
  //         ]
  //     },
  //     {
  //       "election": "Mock Candidates",
  //       "candidates":
  //         [
  //           { 
  //             "name": "John Cena",
  //             "description": "Actor and Wrestler", 
  //             "img": "https://pbs.twimg.com/profile_images/877958014736756736/3Fba7ZkZ_400x400.jpg" 
  //           },
  //           { 
  //             "name": "Will Smith",
  //             "description": "Actor",
  //             "img": "https://pbs.twimg.com/profile_images/3064455031/1ac6047720078b03dac3f27f331d7ed3.jpeg" 
  //           },
  //           { 
  //             "name": "Peppa Pig",
  //             "description": "Actress",
  //             "img": "https://a.thumbs.redditmedia.com/96PzSMB7MdK5d656ucXxMyg0m3edMno292KUuawASN4.png" 
  //           }
  //         ]
  //     },
  //   ];

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
    this.candidateService.getCandidatesByZip(this.zip)
      .subscribe(candidates => 
        {
          this.data = candidates; 
          console.log(this.data);
        }
      );
  }

}
