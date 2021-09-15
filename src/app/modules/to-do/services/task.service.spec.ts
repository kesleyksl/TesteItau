import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../../shared/shared.module';
import { Task } from '../interfaces/task';
import { take } from 'rxjs/operators';
import { TaskService } from './task.service';
import { environment } from 'src/environments/environment';
const mockData = {
  api: `${environment.taskApi}`,
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
    service.getAll().subscribe(
      (response) => {
        expect(response).toBeTruthy();
        done()
      }
    )
    httpControlle
      .expectOne(mockData.api)

  });
  
  it(`${TaskService.prototype.getById.name} should return a task when called`, done => {
    const id = '1';
    service.getById(id).subscribe(
      (response) => {
        expect(response).toBeTruthy();
        done()
      }
    )
    httpControlle
      .expectOne(mockData.api + `/${id}`)
      .flush(mockData.item)
  });
  
});
