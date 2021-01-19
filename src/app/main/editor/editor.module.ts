import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TickerSearchModule } from 'app/main/components/ticker-search/ticker-search.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../../shared/shared.module';

import { StepsPanelComponent } from './steps-panel/steps-panel.component';
import { DetailPanelComponent } from './detail-panel/detail-panel.component';
import { DiagramComponent } from './diagram/diagram.component';
import { StepComponent } from './diagram/step/step.component';
import { PlusComponent } from './diagram/plus/plus.component';
import { ZoomControlComponent } from './zoom-control/zoom-control.component';
import { StepGroupComponent } from './diagram/step-group/step-group.component';

const routes: Routes = [
    {
        path: '',
        component: EditorComponent,
    },
];

@NgModule({
    declarations: [
        EditorComponent,
        StepsPanelComponent,
        DetailPanelComponent,
        DiagramComponent,
        StepComponent,
        PlusComponent,
        ZoomControlComponent,
        StepGroupComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        FontAwesomeModule,

        TickerSearchModule,

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
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
    ],
})
export class EditorModule {}
