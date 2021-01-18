import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fafa from '@fortawesome/free-solid-svg-icons';
import { FlowService } from 'app/services/flow.service';
import { IFlow, IFlowStep } from 'app/shared/interfaces/IFlow';
import { Subscription } from 'rxjs';

@Component({
    selector: 'editor-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit, OnDestroy {
    fafa = fafa;

    flow: IFlow;
    flowId: string;
    subsFlow: Subscription;

    activeStepId: number;
    activeStep: IFlowStep;
    subsActiveStep: Subscription;

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {
        this.subsFlow = this.flowService.flow$.subscribe(({ flowId, flow }) => {
            this.flow = flow;
            this.flowId = flowId;
        });

        this.subsActiveStep = this.flowService.activeStep$.subscribe(({ activeStepId, activeStep }) => {
            this.activeStep = activeStep;
            this.activeStepId = activeStepId;
            console.log(this.activeStepId);
        });
    }

    ngOnDestroy(): void {
        this.subsFlow.unsubscribe();
        this.subsActiveStep.unsubscribe();
    }
}
