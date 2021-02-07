import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  zip: string = sessionStorage.getItem('zip') ?? "Unknown";
  isZipFormActive: boolean = false;
  zipFormToggleTxt: string = "change";

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
    if (this.zip == "Unknown") {
      this.getDeviceLocation();
    }
  }

  getDeviceLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.candidateService.getUserZipFromCoords(position.coords.latitude.toString(), position.coords.longitude.toString())
          .subscribe(zip => {
            this.zip = zip;
            sessionStorage.setItem('zip', zip);
          })
      }, (error) => {
        this.toggleZipForm();
      });
    } else {
      // Error handling if navigation not supported on device
    }
  }

  toggleZipForm(): void {
    this.isZipFormActive = !this.isZipFormActive;
    this.zipFormToggleTxt = !this.isZipFormActive ? "change" : "cancel";
  }

  onChangeZip(): void {
    this.toggleZipForm();
  }

  submitNewZip(form): void {
    if (form.value.newZip != "") {
      this.zip = form.value.newZip;
      sessionStorage.setItem('zip', this.zip);
    }

    this.toggleZipForm();
  }
}
