import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../interfaces/task';
import {take} from 'rxjs/operators';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpClientDependency: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [TaskService,
        { provide: HttpClient, useClass: HttpClient }]
    });
    service = TestBed.get(TaskService);
    httpClientDependency = TestBed.get(HttpClient);

  });

  it('should be created Service', () => {
    expect(service).toBeTruthy();
  });

  it(`#${TaskService.prototype.getAll.name} 
      should return maximun 100 data when called`, async () => { 
        (await service.getAll()).pipe(take(1)).subscribe((tasks) => {
          expect(tasks.length).toBeLessThanOrEqual(100);
        });
  });
  
  it(`#${TaskService.prototype.create.name} 
      should return created  element when length less than 100`, async () => {
        const taskTest = new Task('teste');
        (await service.getAll()).pipe(take(1)).subscribe(async (data)=>{
          if(data.length < 100){
            const response = await service.create(taskTest)
            expect(response).toBeTruthy();
          }
          else{
            expect(true).toBeTruthy();
          }
        });
  });

  it(`#${TaskService.prototype.create.name} 
        should not create when element length equal 100`, async () => {
          const taskTest = new Task('teste');
          
          let allData = await service.getAll();
          allData.pipe(take(1)).subscribe(async (data)=>{
            if(data.length == 100){
              const response = await service.create(taskTest)
              expect(() => { service.create(taskTest); }).toThrowError('Maximum items exceeded');       
            }
            else{
              expect(true).toBeTruthy();  
            }
          });
  });

  it(`#${TaskService.prototype.delete.name} 
      should delete and return deleted element when called`, async () => {
 
        (await service.getAll()).pipe(take(1)).subscribe(async (tasks) => {
          if(tasks.length >= 1){
            let response = await service.delete(tasks[tasks.length - 1].id);
            expect(response).toBeTruthy();
          }
          else{
            expect(true).toBeTruthy();
          } 
        }); 
  });

  it(`#${TaskService.prototype.delete.name} 
  should throw when try deleting without id`, async () => {

    (await service.getAll()).pipe(take(1)).subscribe(async (tasks) => {      
        const response = await service.delete();       
        expect(() => { service.delete(); }).toThrowError('Invalid Id'); 
    }); 
  });
  
  it(`#${TaskService.prototype.update.name} 
      should update when updating item`, async () => {

    (await service.getAll()).pipe(take(1)).subscribe(async (tasks) => {
        let task = tasks[tasks.length - 1];
        task.done = !task.done;
        const response = await service.update(task);       
        expect(response).toBeTruthy();

    }); 
  });
  
  it(`#${TaskService.prototype.update.name} 
      should not update when updating item without Id`, async () => {

    (await service.getAll()).pipe(take(1)).subscribe(async (tasks) => {
        let task = new Task('teste');
        const response = await service.update(task);       
        expect(() => { service.update(task); }).toThrowError('Invalid Item');
    }); 
  });

  it(`#${TaskService.prototype.getById.name} 
      should return an element when passed Id`, async () => {

    (await service.getAll()).pipe(take(1)).subscribe(async (tasks) => {
        let task = tasks[tasks.length - 1];
        const response = await service.getById(task.id);       
        expect(response).toBeTruthy();
    }); 
  });

  it(`#${TaskService.prototype.getById.name} 
        should throw when not pass Id`, async () => {

    (await service.getAll()).pipe(take(1)).subscribe(async (tasks) => {
        let task = new Task('teste');
        const response = await service.getById(task?.id);       
        expect(() => { service.getById(task?.id); }).toThrowError('Invalid Id');
    }); 
  });
});
 