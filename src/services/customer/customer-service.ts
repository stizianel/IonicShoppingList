import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Customer } from '../../models/customer/customer.model';
import { Visit } from '../../models/visit/visit.model';

@Injectable()
export class CustomerService {

    private customerRef = this.db.list<Customer>('customer');
    //private uid: string;
    //private visitRef = this.db.list(`customer/${this.uid}/visit`);

    constructor(private db: AngularFireDatabase) {
        
    }

    getCustomerList() {
        return this.customerRef;
    }

    addCustomer(customer: Customer) {
        return this.customerRef.push(customer);
    }

    editCustomer(customer: Customer) {
        return this.customerRef.update(customer.key, customer);
    }

    removeCustomer(customer: Customer) {
        return this.customerRef.remove(customer.key);
    }

    addCustomerVisit(visit: Visit, customer: Customer) {
        const uid = customer.key;
        const list = this.db.list(`customer/${uid}/visits`);
        return list.push(visit);
    }
}
