import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVisitPage } from './add-visit';

@NgModule({
  declarations: [
    AddVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(AddVisitPage),
  ],
})
export class AddVisitPageModule {}
