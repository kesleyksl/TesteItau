import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input() task: Task;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
  }

  updateTaskStatus(newStatus: boolean) {
    this.taskService.update(new Task(this.task.item, newStatus, this.task.id)).pipe(take(1)).subscribe();
  }

  deleteTask() {
    this.taskService.delete(this.task.id).pipe(take(1)).subscribe();
  }

}
