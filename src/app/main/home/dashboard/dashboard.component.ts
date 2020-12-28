import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StepTemplate, stepTemplates } from "app/classes/Step";
import { FlowsService } from "app/services/flows.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    constructor(private flowsService: FlowsService, private router: Router) {}

    ngOnInit(): void {}

    step0: StepTemplate;
    step1: StepTemplate;

    onClickMakeFlow() {
        let flowId = this.flowsService.createFlow(this.step0, this.step1);
        this.router.navigate(["/editor", flowId]);
    }
}
