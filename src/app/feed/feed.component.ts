import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  zip: string = localStorage.getItem('zip') ?? "Unknown";
  isZipFormActive: boolean = false;
  isSameZip: boolean = false;
  zipFormToggleTxt: string = "change";
  feedInfo;
  loading = false;
  noZip = true;

  isLocationDenied = false;
  isApiError = false;

  constructor(private candidateService: CandidateService) { }

  async ngOnInit() {
    try {
      if (this.zip == "Unknown") {
        var coords = await this.getDeviceLocation();
        this.zip = await this.getZipFromCoords(coords.coords.latitude.toString(), coords.coords.longitude.toString());
        this.noZip = false;

        localStorage.setItem('zip', this.zip);
      }
      else
      {
        this.noZip = false;
      }

      this.loading = true;
      this.feedInfo = await this.getCandidatesFeed(this.zip);
      this.noZip = false;
    } catch (error) {
      this.isLocationDenied = error instanceof GeolocationPositionError;
      this.isApiError = error instanceof HttpErrorResponse;
    } finally {
      this.loading = false;
    }
  }

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
    var newZip = form.value.newZip;
    this.loading = true;

    if (newZip == this.zip) {
      if (!this.isApiError) {
        this.isSameZip = true;
        setTimeout(() => {
          this.isSameZip = false;
        }, 5000);
      } 

      this.loading = false;
      return;
    }

    this.isApiError = false;

    if (newZip != "") {
      try {
        this.feedInfo = await this.getCandidatesFeed(newZip);

        this.zip = newZip;
        localStorage.setItem('zip', this.zip);
        this.noZip = false;
      } catch (error) {
        this.isApiError = error instanceof HttpErrorResponse;
      }
    }

    this.loading = false;
    this.toggleZipForm();
  }

  onCloseLocationError() {
    this.isLocationDenied = false;
  }

  async onUpdateZipThroughDeviceLocation() {
    try {
      this.loading = true;
      this.isApiError = false;

      var userPosition = await this.getDeviceLocation();
      this.zip = await this.getZipFromCoords(userPosition.coords.latitude.toString(), userPosition.coords.longitude.toString());
      this.feedInfo = await this.getCandidatesFeed(this.zip);

      localStorage.setItem('zip', this.zip);
      this.noZip = false;
    } catch(error) {
      if (error instanceof GeolocationPositionError) {
        this.isLocationDenied = true;
      }
    } finally {
      this.loading = false;
    }
  }

}
