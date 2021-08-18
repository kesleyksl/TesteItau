import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm = this.generateNewTaskForm();
  creating: boolean = false;
  @ViewChild('form') form: NgForm;
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly taskService: TaskService,
              private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  generateNewTaskForm(){
    return  this._formBuilder.group({
      item: ['', [Validators.required]],
      done: [false]
    })
  }

  invalidForm(){
    return !this.taskForm.valid ||( this.taskForm?.value.item.trim() === '') || this.creating;
  }

  async submitAndReset(){
    if(!this.taskForm.valid)
      return

    try{
      this.creating = true;
      this.taskForm.disable();
      const newTask = new Task(this.taskForm.value.item, this.taskForm.value.done);
      await this.taskService.create(newTask);
      this.showMessage('Tarefa adicionada');
      this.resetForm();
    }
    catch(error){
      console.error(error);
      this.showMessage(error?.message)
    }
    finally{
      this.taskForm.controls.item.enable();
      this.creating = false;
    }
  }

  resetForm(){
    this.form.resetForm();
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
