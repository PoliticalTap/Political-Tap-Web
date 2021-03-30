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

  constructor(private candidateService: CandidateService) { }

  async ngOnInit() {
    try {
      if (this.zip == "Unknown") {
        var coords = await this.getDeviceLocation();
        this.zip = await this.getZipFromCoords(coords.coords.latitude.toString(), coords.coords.longitude.toString());

        localStorage.setItem('zip', this.zip);
      } else {

      }

      this.data = await this.getCandidates();
      this.loading = false;

    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        this.isLocationDenied = true;
      }
    }
  }

  toggleAccordian(event, index) {
      var element = event.target;
      var panel = element.nextElementSibling;

      element.classList.toggle("active");
      this.data[index].isActive = !this.data[index].isActive;

      panel.hidden = !panel.hidden;
  }

  getCandidates() {
    var zip = localStorage.getItem('zip');

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
    try {
      var userPosition = await this.getDeviceLocation();
      this.zip = await this.getZipFromCoords(userPosition.coords.latitude.toString(), userPosition.coords.longitude.toString());
      localStorage.setItem('zip', this.zip);

      this.data = await this.getCandidates();
      this.loading = false;

    } catch(error) {
      if (error instanceof GeolocationPositionError) {
        this.isLocationDenied = true;
      }
    }
  }

  async submitNewZip(form) {
    var newZip = form.value.newZip;

    if (newZip == this.zip) {
      this.isSameZip = true;

      setTimeout(() => {
        this.isSameZip = false;
      }, 5000);

      return;
    }

    if (newZip != "") {
      this.zip = newZip;
      localStorage.setItem('zip', this.zip);

      this.data = await this.getCandidates();
      this.loading = false;
    }
  }

  onCloseNoticeClaim() {
    this.isNoticeClaimActive = false;
  }

  onCloseLocationError() {
    this.isLocationDenied = false;
  }
}
