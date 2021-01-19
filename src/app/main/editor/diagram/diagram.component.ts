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
    flowId: string;
    subsFlow: Subscription;

    groups: IStepGroup[] = [];

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {
        this.subsFlow = this.flowService.flow$.subscribe(({ flowId, flow }) => {
            // flow = {
            //     _id: 'dadafa',
            //     title: 'mock flow',
            //     status: 'ok',
            //     steps: [
            //         { type: 'buy', order: 0 },
            //         { type: 'signal', order: 1 },
            //         { type: 'signal', order: 1 },
            //         { type: 'signal', order: 1 },
            //         { type: 'signal', order: 1 },
            //         { type: 'signal', order: 1 },
            //         { type: 'sell', order: 2 },
            //         { type: 'sell', order: 2 },
            //         { type: 'sell', order: 2 },
            //         { type: 'sell', order: 2 },
            //         { type: 'sell', order: 3 },
            //     ],
            // };
            this.flow = flow;
            this.flowId = flowId;

            this.groups = [];
            let i = 0;
            while (i < flow.steps.length) {
                const step0 = flow.steps[i];
                const group = { type: step0.type, steps: [step0] };
                let j = i + 1;
                while (j < flow.steps.length) {
                    const step1 = flow.steps[j];
                    if (step1.order !== step0.order) { break; }
                    group.steps.push(step1);
                    j++;
                }
                this.groups.push(group);
                i = j;
            }
        });
    }

    ngOnDestroy(): void {
        this.subsFlow.unsubscribe();
    }
}

interface IStepGroup {
    type: IFlowStepType;
    steps: IFlowStep[];
}
