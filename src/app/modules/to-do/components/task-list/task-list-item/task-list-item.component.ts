import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input() task: Task;

  deletingOrUpdating: boolean = false;
  constructor(private readonly taskService: TaskService,
              private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  async updateTaskStatus(newStatus: boolean){
    try{
      this.deletingOrUpdating = true;
      await this.taskService.update(new Task(this.task.item, newStatus, this.task.id));
      this.showMessage('Tarefa atualizada com sucesso');
    }
    catch(error){
      console.error(error);
      this.showMessage(error?.message);
    }
    finally{
      this.deletingOrUpdating = true;
    }
  }

  async deleteTask(){
    try{
        this.deletingOrUpdating = true;
        await this.taskService.delete(this.task.id);
        this.showMessage('Tarefa removida com sucesso');      
    }
    catch(error){
      console.error(error);
      this.showMessage(error?.message);
    }
    finally{
      this.deletingOrUpdating = false;
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
