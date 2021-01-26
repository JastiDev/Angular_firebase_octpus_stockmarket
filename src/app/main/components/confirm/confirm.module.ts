import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    declarations: [ConfirmComponent],
})
export class ConfirmModule {}
