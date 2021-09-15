import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/task';
import { TaskResponse } from '../interfaces/task-item-response';
import { map, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskApi = environment.taskApi;
  private readonly taskList$ = new BehaviorSubject<Task[]>([]);

  constructor(private readonly http: HttpClient) { }

  getAll() {
    if (this.taskList$.value.length === 0) {

      this.http.get<TaskResponse>(this.taskApi)
        .pipe(
          take(1),
          map((response) => {
            this.updateTaskList(response.items);
          })
        ).subscribe()

    }
    return this.taskList$.asObservable();
  }

  getById(id?: string): Observable<Task> {
    if (!id || id?.trim() === '') {
      throw new Error('Invalid Id');
    }
    return this.http.get<Task>(`${this.taskApi}/${id}`);
  }

  create(newItem: Task): Observable<Task> {
    if (!newItem.isValid()) {
      throw new Error('Invalid Item');
    }
    else if (this.taskList$.value.length === 100) {
      throw new Error('Maximum items exceeded');
    }
    return this.http.post<Task>(`${this.taskApi}`, newItem)
      .pipe(tap((response) => {
        const values = this.taskList$.value;
        values.push(response);
        this.updateTaskList(values);
        return response
      }));
  }

  update(item: Task): Observable<Task> {
    if (!item.isValid(true)) {
      throw new Error('Invalid Item');
    }
    return this.http.put<Task>(`${this.taskApi}/${item.id}`, item)
      .pipe(
        map((response) => {
          const values = this.taskList$.value;
          const index = values.findIndex(task => task.id === item.id);
          if (index >= 0) {
            values[index] = response;
          }
          this.updateTaskList(values);
          return response;
        })
      )
  }

  delete(id?: string): Observable<Task> {
    if (!id || id?.trim() === '') {
      throw new Error('Invalid Id');
    }
    return this.http.delete<Task>(`${this.taskApi}/${id}`)
      .pipe(
        map((response) => {
          const values = this.taskList$.value;
          const index = values.findIndex(task => task.id === id);
          if (index >= 0) {
            values.splice(index, 1);
          }
          this.updateTaskList(values);
          return response;
        })
      )
  }

  private updateTaskList(values: Task[]) {
    this.taskList$.next(values);
  }
}
