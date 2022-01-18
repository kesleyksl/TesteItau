import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/task';
import { TaskResponse } from '../interfaces/task-item-response';
import { map, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskMockService {

  private readonly taskApi = environment.taskApi;
  private taskList$ = new BehaviorSubject<Task[]>([]);
  tasksLoaded: boolean = false;


  getAll(): Observable<Task[]> {
    this.taskList$.next([
        new Task('1')
    ])
    return this.taskList$.asObservable();
  }

  getById(id?: string): Observable<Task> {
    if (!id || id?.trim() === '') {
      throw Error('Invalid Id');
    }
    return of(new Task(id));
  }

  create(newItem: Task): Observable<Task> {
    if (!newItem.isValid()) {
      throw Error('Invalid Item');
    }
    if (this.taskList$.value.length >= 100) {
      throw new TesteError('Maximum items exceeded');
    }
    return of(newItem)
  }

  update(item: Task): Observable<Task> {
    if (!item.isValid(true)) {
      throw new Error('Invalid Item');
    }
    return of(item)
  }

  delete(id?: string): Observable<Task> {
    if (!id || id?.trim() === '') {
      throw new Error('Invalid Id');
    }
    return of(new Task(id))
  }

  private updateTaskList(values: Task[]) {
    this.taskList$.next(values);
  }
}


export class TesteError extends Error{
  constructor(mensagem: string){
    super(mensagem);
  }
}