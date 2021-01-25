import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowStatusComponent } from './flow-status.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    imports: [CommonModule, MatChipsModule],
    declarations: [FlowStatusComponent],
    exports: [FlowStatusComponent],
})
export class FlowStatusModule {}
