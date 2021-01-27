import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  zip: string = sessionStorage.getItem('zip');
  isZipFormActive: boolean = false;

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log("Location is not supported on this device!");
    }

    if (!this.zip) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.candidateService.getUserZipFromCoords(position.coords.latitude.toString(), position.coords.longitude.toString())
          .subscribe(zip => {
            this.zip = zip;
            sessionStorage.setItem('zip', zip);
          });
      });
    }
  }

  onChangeZip(): void {
    this.isZipFormActive = !this.isZipFormActive;
  }

  submitNewZip(form): void {
    this.zip = form.value.newZip;
    sessionStorage.setItem('zip', this.zip);

    this.isZipFormActive = false;
  }
}
