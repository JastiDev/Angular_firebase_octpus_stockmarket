import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from './chart/chart.component';

const routes = [{ path: 'dashboard', component: DashboardComponent }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
    ],
    declarations: [DashboardComponent, ChartComponent],
})
export class DashboardModule {}
