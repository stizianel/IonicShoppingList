import { ToastService } from '../../services/toast/toast.service';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Item } from '../../models/item/item.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {
  item: Item;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private shopping: ShoppingListService,
              private toast: ToastService,
              private camera: Camera) {
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad EditShoppingItemPage');
    this.item = this.navParams.get('item');
  }

  saveItem(item: Item) {
    this.shopping.editItem(item)
      .then(() => {
        this.toast.show(`${item.name} saved!`);
        this.navCtrl.setRoot('HomePage');
      });
  }

  removeItem(item: Item) {
    this.shopping.removeItem(item)
      .then(() => {
        this.toast.show(`${item.name} removed!`);
        this.navCtrl.setRoot('HomePage');
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
