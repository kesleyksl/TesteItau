import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/task';
import { TaskResponse } from '../interfaces/task-item-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly taskApi = environment.taskApi;
  private readonly taskList$ = new BehaviorSubject<Task[]>([]);

  constructor(private readonly http: HttpClient) { }

  async getAll() {
    if (this.taskList$.value.length === 0) {

      try {
        const response = await this.http.get<TaskResponse>(this.taskApi).toPromise();
        this.updateTaskList(response.items);
      }
      catch (error) {
        this.updateTaskList([]);
        throw error
      }
    }
    return this.taskList$.asObservable();
  }

  getById(id?: string): Promise<Task> {
    if (!id || id?.trim() === '') {
      throw new Error('Invalid Id');
    }
    return this.http.get<Task>(`${this.taskApi}/${id}`).toPromise();
  }

  async create(newItem: Task): Promise<Task> {
    if (!newItem.isValid()) {
      throw new Error('Invalid Item');
    }
    else if(this.taskList$.value.length === 100){
      throw new Error('Maximum items exceeded');
    }
    try{
      const response = await this.http.post<Task>(`${this.taskApi}`, newItem).toPromise();
      const values = this.taskList$.value;
      values.push(response);
      this.updateTaskList(values);
      return response;
    }
    catch(error){
      throw error;
    }
  }

  async update(item: Task): Promise<Task> {
    if (!item.isValid(true)) {
      throw new Error('Invalid Item');
    }
    try{
      const response = await this.http.put<Task>(`${this.taskApi}/${item.id}`, item).toPromise();
      const values = this.taskList$.value;
      const index = values.findIndex(task => task.id === item.id);
      if(index >= 0){
        values[index] = response;
      }
      this.updateTaskList(values);
      return response;
    }
    catch(error){
      throw error;
    }
  }

  async delete(id?: string): Promise<Task> {
    if (!id || id?.trim() === '') {
      throw new Error('Invalid Id');
    }
    try{
      const response = await this.http.delete<Task>(`${this.taskApi}/${id}`).toPromise();
      const values = this.taskList$.value;
      const index = values.findIndex(task => task.id === id);
      if(index >= 0){
        values.splice(index, 1);
      }
      this.updateTaskList(values);
      return response;
    }
    catch(error){
      throw error;
    }    
  }

  private updateTaskList(values: Task[]){
    this.taskList$.next(values);

  }
}
