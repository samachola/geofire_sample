import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';


import * as firebase from 'firebase/app';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot} from 'geofirestore';
import { GeoFire } from 'geofire';
import { environment } from 'src/environments/environment';
import { identifierModuleUrl } from '@angular/compiler';


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

  geoFirestore: GeoFirestore;
  geoCollection: GeoCollectionReference;

  firestore: any;

  constructor() {
    firebase.initializeApp(environment.firebase);
    this.firestore = firebase.firestore();
  }

  // what do we want.
  // an input field that enables a user to enter their location ✅
  // save location on enter to locations collection
  // Get list of pins based on uquery.

  ngOnInit() {
    this.geoFirestore = new GeoFirestore(this.firestore);
    this.geoCollection = this.geoFirestore.collection('restaurants');

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
    this.locationName = address.formatted_address;
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
  }

  search() {
    console.log(this.searchForm.value);
    this.geoCollection.add({
      name: this.locationName,
      score: 100,
      // The coordinates field must be a GeoPoint!
      coordinates: new firebase.firestore.GeoPoint(this.lat, this.lng)
    });

    this.getRestaurants();
  }


  getRestaurants() {
    const query: GeoQuery = this.geoCollection.near({ center: new firebase.firestore.GeoPoint(this.lat, this.lng), radius: 5000 });
    query.get().then(data => {
      const restaurants = data.docs;
      const nearbyRestaurants = restaurants.map(restaurant => ({
        id: restaurant.id,
        ...restaurant.data(),
      }));

      console.log(nearbyRestaurants);
    });
  }

}
