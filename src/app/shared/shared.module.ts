import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepTypePipe } from './pipes/step-type.pipe';
import { SignalTypePipe } from './pipes/signal-type.pipe';

@NgModule({
  declarations: [
    StepTypePipe,
    SignalTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StepTypePipe,
    SignalTypePipe
  ]
})
export class SharedModule { }
