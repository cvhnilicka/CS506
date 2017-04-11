import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Tasks } from '../providers/tasks';
import { CreateNewTaskPage } from '../pages/create-new-task/create-new-task';
import { EditTaskPage} from '../pages/edit-task/edit-task';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    CreateNewTaskPage,
    EditTaskPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    CreateNewTaskPage,
    EditTaskPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Tasks]
})
export class AppModule {}

