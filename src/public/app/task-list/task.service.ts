import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Task } from './task';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class TaskService {

  private mockTasks: Task[];

  constructor(private http: Http) {
    this.mockTasks = [
      {
        task: 'nothing',
        deadline: undefined,
        priority: 3,
      }
    ];
  }

  private getTasks(): Promise<Task[]> {
    return Promise.resolve(this.mockTasks);
  }

  getAllTasks() {
    return this.http.get('/api/allTasks').map(res => res.json());
  }

}
