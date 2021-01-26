import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowsComponent } from './flows.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlowComponent } from './flow/flow.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { RenameComponent } from './rename/rename.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '../../../auth/auth.guard';
import { FlowStatusModule } from 'app/main/components/flow-status/flow-status.module';
import { ConfirmModule } from 'app/main/components/confirm/confirm.module';

const routes: Routes = [{ path: 'strategies', canActivate: [AuthGuard], component: FlowsComponent }];

@NgModule({
    declarations: [FlowsComponent, FlowComponent, RenameComponent, DetailsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatProgressBarModule,

        FontAwesomeModule,

        FlowStatusModule,
        ConfirmModule,
    ],
})
export class FlowsModule {}
