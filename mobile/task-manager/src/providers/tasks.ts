import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Tasks provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Tasks {

	data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  getTasks() {
  	if (this.data) {
  		return Promise.resolve(this.data);
  	}

  	return new Promise(resolve => {
  		this.http.get('http://localhost:8000/api/tasks')
  		.map(res => res.json())
  		.subscribe(data => {
  			this.data = data;
  			resolve(this.data);
  		});
  	});
  }

  createTasks(task) {
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');

  	this.http.post('http://localhost:8000/api/tasks', JSON.stringify(task), {headers: headers})
  		.subscribe(res => {
  			console.log(res.json());
  		});
  }









}
