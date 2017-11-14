import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Customer } from '../../models/customer/customer.model';

@Injectable()
export class CustomerService {
    private customerRef = this.db.list<Customer>('customer');

    constructor(private db: AngularFireDatabase) {
        
    }

    getCustomerList() {
        return this.customerRef;
    }

    addCustomer(item: Customer) {
        return this.customerRef.push(item);
    }

    editCustomer(item: Customer) {
        return this.customerRef.update(item.key, item);
    }

    removeCustomer(item: Customer) {
        return this.customerRef.remove(item.key);
    }

}
