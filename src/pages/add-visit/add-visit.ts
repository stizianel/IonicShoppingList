import { ToastService } from '../../services/toast/toast.service';
import { CustomerService } from '../../services/customer/customer-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../models/customer/customer.model';
import { Visit } from '../../models/visit/visit.model';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

/**
 * Generated class for the AddVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-visit',
  templateUrl: 'add-visit.html',
})
export class AddVisitPage {
  customer: Customer;
  refKey: string = undefined;

  visit: Visit = {
    name: '',
    visitDate: undefined,
    priority: undefined,
    notes: undefined
  }
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private customerService: CustomerService,
              private toast: ToastService,
              private camera: Camera) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad AddVisitPage');
    this.customer = this.navParams.get('customer');
  }

  saveVisit(visit: Visit) {
    this.customerService.addCustomerVisit(visit, this.customer)
      .then((res) => {
        this.refKey = res.key;
        //debugger;
        this.toast.show(`${visit.name} saved!`);
        //this.navCtrl.setRoot('CustomerListPage');
      });
  }

  async takePhoto() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`

      const pictures = storage().ref('pictures');

      pictures.putString(image, 'data_url');
    }
    catch (e) {
      console.error(e);
    }
  }
}
