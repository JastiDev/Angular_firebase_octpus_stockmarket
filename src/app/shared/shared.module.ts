import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepTypePipe } from './pipes/step-type.pipe';

@NgModule({
  declarations: [
    StepTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StepTypePipe
  ]
})
export class SharedModule { }
