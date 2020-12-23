import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyappsComponent } from "./myapps.component";

import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "myapps", component: MyappsComponent }];

@NgModule({
    declarations: [MyappsComponent],
    imports: [RouterModule.forChild(routes), CommonModule],
})
export class MyappsModule {}
