import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { EditorComponent } from "./editor.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatToolbarModule } from "@angular/material/toolbar";

const routes: Routes = [
    {
        path: "",
        component: EditorComponent,
    },
];

@NgModule({
    declarations: [EditorComponent],
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
        MatToolbarModule,
    ],
})
export class EditorModule {}
