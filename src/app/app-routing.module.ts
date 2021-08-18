import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children:[
      {
        path: '',
        redirectTo: 'ToDo',
        pathMatch: 'full'
      },
      {
        path: 'ToDo',
        loadChildren: ()=> import('./modules/to-do/to-do.module').then((m)=> m.ToDoModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
