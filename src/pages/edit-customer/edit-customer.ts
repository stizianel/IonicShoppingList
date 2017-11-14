import { ToastService } from '../../services/toast/toast.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomerService } from '../../services/customer/customer-service';
import { Customer } from '../../models/customer/customer.model';

/**
 * Generated class for the EditCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-customer',
  templateUrl: 'edit-customer.html',
})
export class EditCustomerPage {
  
  customer: Customer;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private customerService: CustomerService,
              private toast: ToastService) {
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad EditCustomerPage');
    this.customer = this.navParams.get('customer');
  }

  saveCustomer(customer: Customer) {
    this.customerService.editCustomer(customer)
      .then(() => {
        this.toast.show(`${customer.name} saved!`);
        this.navCtrl.setRoot('CustomerListPage');
      });
  }

  removeCustomer(customer: Customer) {
    this.customerService.removeCustomer(customer)
      .then(() => {
        this.toast.show(`${customer.name} removed!`);
        this.navCtrl.setRoot('CustomerListPage');
      });
  }
}
