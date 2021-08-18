import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
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
  constructor(private readonly taskService: TaskService,
              private readonly notificationService: NotificationService) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks(){
    try{
      this.loadingData = true;
      this.tasks$ = await this.taskService.getAll();
    }
    catch(error){
      console.error(error);
      this.showMessage(error?.message)
    }
    finally{
      this.loadingData = false;
    }
  }

  showMessage(message: string){
    this.notificationService.showSnackbar({
      message: message,
      config: {
        horizontalPosition: 'center',
        duration: 3000,
        verticalPosition: 'bottom'
      }
    })
  }
} 
