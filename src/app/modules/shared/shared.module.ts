import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreventEspecialCharactersDirective } from './directives/prevent-especial-characters.directive';
import { NotificationService } from './services/notification.service';



@NgModule({
  declarations: [
    PreventEspecialCharactersDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PreventEspecialCharactersDirective
  ],
  providers:[
    NotificationService
  ]
})
export class SharedModule { }
