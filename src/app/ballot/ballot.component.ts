import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';


@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css']
})
export class BallotComponent implements OnInit {
  zip: string = localStorage.getItem('zip') ?? "Unknown";

  data: any;
  noZip = true;
  loading = false;
  isNoticeClaimActive = true;
  isSameZip: boolean = false;
  isLocationDenied = false;
  isApiError = false;

  constructor(private candidateService: CandidateService) { }

  async ngOnInit() {
    try {
      if (this.zip == "Unknown") {
        var coords = await this.getDeviceLocation();
        this.zip = await this.getZipFromCoords(coords.coords.latitude.toString(), coords.coords.longitude.toString());

        localStorage.setItem('zip', this.zip);
      } 

      this.data = await this.getCandidates(this.zip);

    } catch (error) {
      this.isApiError = error instanceof HttpErrorResponse;
      this.isLocationDenied = error instanceof GeolocationPositionError;
    } finally {
      this.loading = false;
    }
  }

  toggleAccordian(event, index) {
      var element = event.target;
      var panel = element.nextElementSibling;

      element.classList.toggle("active");
      this.data[index].isActive = !this.data[index].isActive;

      panel.hidden = !panel.hidden;
  }

  getCandidates(zip) {
    if(zip) {
      this.noZip = false;
      this.loading = true;
    }

    return this.candidateService.getCandidatesByZip(zip).toPromise();
  }

  getDeviceLocation(): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  getZipFromCoords(lat, long) {
    return this.candidateService.getUserZipFromCoords(lat, long).toPromise();
  }

  async onUpdateZipThroughDeviceLocation() {
    this.isApiError = false;

    try {
      var userPosition = await this.getDeviceLocation();
      this.zip = await this.getZipFromCoords(userPosition.coords.latitude.toString(), userPosition.coords.longitude.toString());
      this.data = await this.getCandidates(this.zip);

      localStorage.setItem('zip', this.zip);
    } catch(error) {
      this.isLocationDenied = error instanceof GeolocationPositionError;
      this.isApiError = error instanceof HttpErrorResponse;
    } finally {
      this.loading = false;
    }
  }

  async submitNewZip(form) {
    var newZip = form.value.newZip;
    this.isApiError = false;

    if (newZip == this.zip) {
      this.isSameZip = true;

      setTimeout(() => {
        this.isSameZip = false;
      }, 5000);

      return;
    }

    if (newZip != "") {
      try {
        this.data = await this.getCandidates(newZip);

        this.zip = newZip;
        localStorage.setItem('zip', this.zip);
      } catch (error) {
        this.isApiError = error instanceof HttpErrorResponse;
      } finally {
        this.loading = false;
      }
    }
  }

  onCloseNoticeClaim() {
    this.isNoticeClaimActive = false;
  }

  onCloseLocationError() {
    this.isLocationDenied = false;
  }
}
