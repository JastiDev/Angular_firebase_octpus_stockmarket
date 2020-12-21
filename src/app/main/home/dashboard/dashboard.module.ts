import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";

const routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes), CommonModule],
})
export class DashboardModule {}
