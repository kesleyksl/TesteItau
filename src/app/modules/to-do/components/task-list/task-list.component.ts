import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  loadingData: boolean = false
  constructor(private readonly taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  private async getTasks(){
      this.loadingData = true;
      this.tasks$ = this.taskService.getAll();
      this.loadingData = false;
  }

} 
