import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardModule } from "./dashboard/dashboard.module";
import { FlowsModule } from "./flows/flows.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, DashboardModule, FlowsModule],
})
export class HomeModule {}
