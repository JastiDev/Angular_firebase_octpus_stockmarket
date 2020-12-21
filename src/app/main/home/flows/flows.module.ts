import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlowsComponent } from "./flows.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "flows", component: FlowsComponent }];

@NgModule({
    declarations: [FlowsComponent],
    imports: [RouterModule.forChild(routes), CommonModule],
})
export class FlowsModule {}
