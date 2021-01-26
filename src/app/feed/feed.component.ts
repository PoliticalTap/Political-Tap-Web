import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  test = true;

  constructor() { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log("Location is not supported on this device!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }

}
