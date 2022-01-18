import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../interfaces/task';
import { TaskResponse } from '../interfaces/task-item-response';
import { TaskService, TesteError } from './task.service';

const mockData = {
  api: "https://61088c1dd73c6400170d3981.mockapi.io/api/v1/tasks",
  items: [
    {
      id: '1',
      item: 'example 1',
      done: true
    },
    {
      id: '2',
      item: 'example 1',
      done: true
    },
  ],
  item: {
    id: '1',
    item: 'example 1',
    done: true
  }
}
describe('TaskService', () => {
  let service: TaskService;
  let httpControlle: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      providers: [TaskService]
    }).compileComponents();
    service = TestBed.inject(TaskService);
    httpControlle = TestBed.inject(HttpTestingController);

  });
  afterEach(() => httpControlle.verify());

  it('should be created Service', () => {
    expect(service).toBeTruthy();
  });

  it(`${TaskService.prototype.getAll.name} should have be an array when called`, done => {
    spyOn(service.http, 'get').and.returnValue(of(mockObservable100Tasks()))
    
    service.getAll().subscribe(
      (response: Task[]) => {
        console.log(response[0])
        expect(response[0].id).toEqual('1');
        done()
      }
    )
    // httpControlle
    //   .expectOne(mockData.api)
    //   .flush([new Task('1', false, '1')])
  });

  it(`${TaskService.prototype.getById.name} should return a task when called`, done => {
    const id = '1';
    service.getById(id).subscribe(
      (response) => {
        expect(response.id).toBeTruthy();
        done()
      }
    )
    httpControlle
      .expectOne(mockData.api + `/${id}`)
      .flush(mockData.item)
  });

  it(`${TaskService.prototype.getById.name} should throw when method called with empty id`, () => {
    expect(() => service.getById()).toThrow();
  });

  it(`${TaskService.prototype.create.name} should throw when method called with invalid task`, () => {
    const task = new Task('');
    expect(() => service.create(task)).toThrow();
  });
  
  it(`${TaskService.prototype.create.name} should create task when called`, done => {
    const newTask = new Task('Teste', false);
    service.create(newTask).subscribe(
      (response) => {
        expect(response.item).toBe('Teste');
        done()
      }
    );

    httpControlle
      .expectOne(mockData.api)
      .flush(newTask)
  });
 
  it(`${TaskService.prototype.create.name} should NOT create task when called with limite exceeded`, done => {
    spyOn(service.http, 'get').and.returnValue(of(mockObservable100Tasks()))

    service.getAll().subscribe((a)=>{
      done();
    });

    expect(() =>service.create(new Task('Teste')).subscribe()).toThrow(new TesteError('Maximum items exceeded'));
  });

  it(`${TaskService.prototype.update.name} should throw when method called with invalid task`, () => {
    const task = new Task('');
    expect(() => service.update(task)).toThrow();
  });

  it(`${TaskService.prototype.update.name} should return a task when method called correctly`, done => {
    const task = new Task('Teste', true, '1');
    service.update(task).subscribe(
      (response) => {
        expect(response.item).toBe('Teste');
        done();
      }
    )
    httpControlle
      .expectOne(mockData.api + `/${task.id}`)
      .flush(task)
  });
  it(`${TaskService.prototype.delete.name} should throw when method called without id`, () => {
    expect(() => service.delete()).toThrow();
  });

  it(`${TaskService.prototype.delete.name} should return a task when method called correctly`, done => {
    const task = new Task('Teste', true, '1');
    service.delete(task.id).subscribe(
      (response) => {
        expect(response.item).toBe('Teste');
        done();
      }
    )
    httpControlle
      .expectOne(mockData.api + `/${task.id}`)
      .flush(task)
  });
});

export function mockObservable100Tasks(): TaskResponse{
  const items: Task[] = [];
  for(let i = 1; i<101; i++){
    items.push(new Task(`${i}`, false, `${i}`))
  }

  return {items};
}