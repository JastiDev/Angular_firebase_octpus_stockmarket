import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fafa from '@fortawesome/free-solid-svg-icons';
import { FlowService } from 'app/services/flow.service';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import { Subscription } from 'rxjs';

@Component({
    selector: 'editor-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit, OnDestroy {
    fafa = fafa;

    flow: IFlow;
    subsFlow: Subscription;

    groups: IStepGroup[] = [];

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {
        this.flow = this.flowService.getFlow();
        this.makeGroups(this.flow);

        this.subsFlow = this.flowService.flow$.subscribe(({ flowId, flow }) => {
            this.flow = flow;
            this.makeGroups(this.flow);
        });
    }

    ngOnDestroy(): void {
        this.subsFlow.unsubscribe();
    }

    makeGroups(flow: IFlow): void {
        this.groups = [];
        let i = 0;
        while (i < flow.steps.length) {
            const step0 = flow.steps[i];
            const group = { type: step0.type, steps: [step0] };
            let j = i + 1;
            while (j < flow.steps.length) {
                const step1 = flow.steps[j];
                if (step1.order !== step0.order) {
                    break;
                }
                group.steps.push(step1);
                j++;
            }
            this.groups.push(group);
            i = j;
        }
    }
}

interface IStepGroup {
    type: IFlowStepType;
    steps: IFlowStep[];
}
