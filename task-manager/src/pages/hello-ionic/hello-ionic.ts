import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {CreateNewTaskPage} from "../create-new-task/create-new-task";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {
  	  // Add dummy data list
  /*this.items = [
	  	{title: 'item1'},
	  	{title: 'item2'},
	  	{title: 'item3'},
	  	{title: 'item4'},
	  	{title: 'item5'},
	  	{title: 'item6'},
  	];
  */
  // Add Delete function
  /*
  removeItem(item){
  	for (i = 0; i <this.items.length; i++){
  		if (this.items[i] == item){
  			this.items.splice(i,1);
  		}
  	}
  }
	*/

  }
  createNewTaskTapped(){
    this.navCtrl.push(CreateNewTaskPage);
  }


}
