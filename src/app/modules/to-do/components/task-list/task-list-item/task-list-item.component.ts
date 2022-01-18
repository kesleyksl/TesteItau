import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { take } from 'rxjs/operators';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent {
  @Input() task: Task;
  constructor(private readonly taskService: TaskService) { }

  updateTaskStatus(newStatus: boolean) {
    this.taskService.update(new Task(this.task.item, newStatus, this.task.id)).pipe(take(1)).subscribe();
  }

  deleteTask() {
    this.taskService.delete(this.task.id).pipe(take(1)).subscribe();
  }

}
