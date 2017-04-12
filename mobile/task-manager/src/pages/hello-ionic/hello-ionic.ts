import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {CreateNewTaskPage} from "../create-new-task/create-new-task";


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {

  }
  createNewTaskTapped(){
    this.navCtrl.push(CreateNewTaskPage);
  }
}
