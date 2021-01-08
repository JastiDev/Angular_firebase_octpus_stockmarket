import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlowsService } from "app/services/flows.service";
import * as fafa from "@fortawesome/free-solid-svg-icons";
import { Flow } from "app/classes/Flow";
import { Step, StepTemplate, stepTemplates } from "app/classes/Step";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    constructor(private flowsService: FlowsService, private router: Router) {}

    ngOnInit(): void {}
    fafa = fafa;
    step0: StepTemplate;
    step1: StepTemplate;

    onClickMakeFlow() {
        let flowId = this.flowsService.createFlow(this.step0, this.step1);
        this.router.navigate(["/editor", flowId]);
    }

    onClickPopularCard() {
        let flow = new Flow("Buy racket and sell", false, [new Step(stepTemplates[0]), new Step(stepTemplates[2]), new Step(stepTemplates[1])]);
        let flowId = this.flowsService.addFlow(flow);
        this.router.navigate(["/editor", flowId]);
    }
}
