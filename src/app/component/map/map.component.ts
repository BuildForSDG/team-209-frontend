import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() location:[];
   location_string:String;
 

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("locations",this.location);
    let new_loc=[];
     this.location.forEach(loc=>{
       this.location_string += `&markers=color:red%7Clabel:S%7C${loc[1]},${loc[0]}`
     })
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
