import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardModule } from './dashboard/dashboard.module';
import { DiscoverModule } from './discover/discover.module';
import { FlowsModule } from './flows/flows.module';
import { MyappsModule } from './myapps/myapps.module';
import { PricingBillingModule } from './pricing-billing/pricing-billing.module';

const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'dashboard' }];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes), CommonModule, DiscoverModule, FlowsModule, MyappsModule, DashboardModule, PricingBillingModule],
})
export class HomeModule {}
