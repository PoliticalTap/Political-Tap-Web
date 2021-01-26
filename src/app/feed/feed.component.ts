import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  test = true;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log("Location is not supported on this device!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.candidateService.getUserZipFromCoords(position.coords.latitude.toString(), position.coords.longitude.toString())
        .subscribe(zip => {
          sessionStorage.setItem('zip', zip);
        });
    });
  }
}
