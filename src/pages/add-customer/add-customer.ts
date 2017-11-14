import { ToastService } from '../../services/toast/toast.service';
import { CustomerService } from '../../services/customer/customer-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../models/customer/customer.model';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
})
export class AddCustomerPage {
  customer: Customer = {
    name: '',
    address: undefined,
    city: undefined
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private customerService: CustomerService,
              private toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
  }

  addCustomer(customer: Customer) {
    this.customerService.addCustomer(customer)
      .then(ref => {
        this.toast.show(`${customer.name} added!`);
        this.navCtrl.setRoot('CustomerListPage', { key: ref.key });
    })
  }
}
