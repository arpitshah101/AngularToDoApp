import { Component, OnInit } from '@angular/core';

import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit {

  private allTasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this._getAllTasks();
  }

  private _getAllTasks() {
    this.taskService.getAllTasks()
      .subscribe(data => {
        this.allTasks = data;
        console.log(data);
      });
  }

}
