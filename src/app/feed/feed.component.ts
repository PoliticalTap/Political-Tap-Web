import { Position } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { nextTick } from 'process';
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
  feedInfo;

  constructor(private candidateService: CandidateService) { }

  async ngOnInit() {
    if (this.zip == "Unknown") {
      var test = await this.getDeviceLocation();
      console.log(test);
      this.zip = await this.getZipFromCoords(test.coords.latitude.toString(), test.coords.longitude.toString());

      // this.getDeviceLocation();
    } 

    this.feedInfo = await this.getCandidatesFeed(this.zip);
    // this.getCandidatesFeed();
  }

  // getDeviceLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.candidateService.getUserZipFromCoords(position.coords.latitude.toString(), position.coords.longitude.toString())
  //         .subscribe(zip => {
  //           this.zip = zip;
  //           sessionStorage.setItem('zip', zip);
  //         })
  //     }, (error) => {
  //       this.toggleZipForm();
  //     });
  //   } else {
  //     // Error handling if navigation not supported on device
  //   }
  // }

  // getCandidatesFeed() {
  //   if (this.zip != "Unknown") {
  //     this.candidateService.getFeedView(this.zip)
  //       .subscribe(feed => {
  //         this.feedInfo = feed;
  //         console.log(feed);
  //       })
  //   }
  // }

  

  getDeviceLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getZipFromCoords(lat, long) {
    return this.candidateService.getUserZipFromCoords(lat, long).toPromise();
  }

  getCandidatesFeed(zipCode) {
    if (zipCode != "" && "Unknown") {
      return this.candidateService.getFeedView(zipCode).toPromise();
    }

    return null;
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

      // this.getCandidatesFeed();
    }

    this.toggleZipForm();
  }
}
