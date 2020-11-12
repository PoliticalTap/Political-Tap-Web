import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router'

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  candidate_id: string;

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.candidate_id = this.route.snapshot.paramMap.get("id");
    console.log(this.candidate_id);
  }


}
