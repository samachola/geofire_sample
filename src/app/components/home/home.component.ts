import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;

  google: any;
  searchForm: FormGroup;
  lat: number;
  lng: number;
  locationName: string;
  constructor() { }

  // what do we want.

  // an input field that enables a user to enter their location
  // save location on enter to locations collection
  // Get list of pins based on uquery.

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

    this.searchForm = new FormGroup({
      location: new FormControl(),
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  onChange(address) {
    console.log(address);
  }

  search() {
    console.log(this.searchForm.value);
  }

}
