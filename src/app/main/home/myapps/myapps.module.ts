import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyappsComponent } from './myapps.component';

import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [{ path: 'myapps', component: MyappsComponent }];

@NgModule({
    declarations: [MyappsComponent],
    imports: [RouterModule.forChild(routes), CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class MyappsModule {}
