import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreventEspecialCharactersDirective } from './directives/prevent-especial-characters.directive';
import { MaterialModule } from './material.module';



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
  ]
})
export class SharedModule { }
