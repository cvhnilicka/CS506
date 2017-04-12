import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { EditTaskPage } from '../edit-task/edit-task';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,
              public actionsheetCtrl: ActionSheetController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  openMenu(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Complete'

        },
        {
          text: 'Edit',
          handler: () => {
            this.itemTapped();
          }

        },
        {
          text: 'Delete'

        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  itemTapped() {
    this.navCtrl.push(EditTaskPage);
  }
}



