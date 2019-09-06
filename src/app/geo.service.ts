import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

// import * as GeoFire from 'geofire';
import { GeoFire } from 'geofire';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  dbRef: any;
  geofire: any;

  hits = new BehaviorSubject([]);
  constructor(private db: AngularFirestore, private geoF: GeoFire) {
    // Reference database location for GeoFire
    this.dbRef = this.db.collection('/locations');

    console.log(this.dbRef);
  }
}
