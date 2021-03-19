import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-officials',
  templateUrl: './officials.component.html',
  styleUrls: ['./officials.component.css']
})

export class OfficialsComponent implements OnInit {
  zip: string = sessionStorage.getItem('zip') ?? "Unknown";

  officials: any;
  noZip = true;
  loading = false;

  constructor(private candidateService: CandidateService) { }

  async ngOnInit() {
    try {
      if (this.zip == "Unknown") {
        var coords = await this.getDeviceLocation();
        this.zip = await this.getZipFromCoords(coords.coords.latitude.toString(), coords.coords.longitude.toString());

        sessionStorage.setItem('zip', this.zip);
      } else {

      }

      this.officials = await this.getOfficials();
      this.loading = false;

    } catch (error) {
      console.log(error);
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

  async onUpdateZipThroughDeviceLocation() {
    try {
      var userPosition = await this.getDeviceLocation();
      this.zip = await this.getZipFromCoords(userPosition.coords.latitude.toString(), userPosition.coords.longitude.toString());
      sessionStorage.setItem('zip', this.zip);

      this.officials = await this.getOfficials();
      this.loading = false;

    } catch(error) {
      console.log(error);
    }
  }
  
  toggleAccordian(event, index) {
      var element = event.target;
      var panel = element.nextElementSibling;

      element.classList.toggle("active");
      this.officials[index].isActive = !this.officials[index].isActive;

      panel.hidden = !panel.hidden;
  }

  async getOfficials() {
    var zip = sessionStorage.getItem('zip');
    
    if(zip)
    {
      this.noZip = false;
      this.loading = true;
    }

    return this.candidateService.getOfficialsList(zip).toPromise();
  }

  async submitNewZip(form) {
    if (form.value.newZip != "") {
      this.zip = form.value.newZip;
      sessionStorage.setItem('zip', this.zip);

      this.officials = await this.getOfficials();
      this.loading = false;
    }
  }

}
