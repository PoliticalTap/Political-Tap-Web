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
    try {
      if (this.zip == "Unknown") {
        var coords = await this.getDeviceLocation();
        this.zip = await this.getZipFromCoords(coords.coords.latitude.toString(), coords.coords.longitude.toString());

        sessionStorage.setItem('zip', this.zip);
      }

      this.feedInfo = await this.getCandidatesFeed(this.zip);
    } catch (error) {
      console.log(error);
    }
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

  getDeviceLocation(): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getZipFromCoords(lat, long) {
    return this.candidateService.getUserZipFromCoords(lat, long).toPromise();
  }

  getCandidatesFeed(zipCode) {
    return this.candidateService.getFeedView(zipCode).toPromise();
  }

  toggleZipForm(): void {
    this.isZipFormActive = !this.isZipFormActive;
    this.zipFormToggleTxt = !this.isZipFormActive ? "change" : "cancel";
  }

  onChangeZip(): void {
    this.toggleZipForm();
  }

  async submitNewZip(form) {
    if (form.value.newZip != "") {
      this.zip = form.value.newZip;
      sessionStorage.setItem('zip', this.zip);

      this.feedInfo = await this.getCandidatesFeed(this.zip);
    }

    this.toggleZipForm();
  }

  async onUpdateZipThroughDeviceLocation() {
    try {
      var userPosition = await this.getDeviceLocation();
      this.zip = await this.getZipFromCoords(userPosition.coords.latitude.toString(), userPosition.coords.longitude.toString());
      this.feedInfo = await this.getCandidatesFeed(this.zip);

      sessionStorage.setItem('zip', this.zip);
    } catch(error) {
      console.log(error);
    }
  }

}
