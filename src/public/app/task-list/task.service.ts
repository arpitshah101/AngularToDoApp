import { Injectable } from '@angular/core';

import { ITask } from '../task.interface';

@Injectable()
export class TaskService {

  private mockTasks: ITask[];

  constructor() {
    this.mockTasks = [
      {
        name: 'nothing',
        deadline: undefined,
        priority: 3,
      }
    ];
  }

  getTasks(): Promise<ITask[]> {
    return Promise.resolve(this.mockTasks);
  }

}
