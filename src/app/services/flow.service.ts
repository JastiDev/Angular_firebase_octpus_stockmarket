import { Injectable } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class FlowService {
    private flow: IFlow;
    private flowId: string;
    flow$ = new Subject<{ flowId: string; flow: IFlow }>();

    private activeStepId: number;
    private activeStep: IFlowStep;
    activeStep$ = new Subject<{ activeStepId: number; activeStep: IFlowStep }>();

    unsavedChanges = false;

    constructor(private apiService: ApiService) {}

    /** Flow */
    private nextFlow(): void {
        this.flow$.next({ flowId: this.flowId, flow: this.flow });
    }

    private initActiveStep(): void {
        this.activeStepId = -1;
        this.activeStep = null;
    }

    setFlow(flowId: string, flow: IFlow): void {
        this.flowId = flowId;
        this.flow = flow;
        this.initActiveStep();
        this.nextFlow();
        this.nextActiveStep();
    }

    updateFlow(flow: IFlow, data: Partial<IFlow>): void {
        Object.assign(flow, data);
        this.apiService.updateFlow(flow._id, data);
    }

    addStep(type: IFlowStepType, id: number): void {
        const step: IFlowStep = {
            type,
            ticker: '',
            state: 'waiting',
        };

        if (id >= 0 && id < this.flow.steps.length) {
            this.flow.steps = [...this.flow.steps.slice(0, id), step, ...this.flow.steps.slice(id, this.flow.steps.length)];
            this.nextFlow();
            this.setActiveStep(id, step);
        } else {
            this.flow.steps.push(step);
            this.nextFlow();
            this.setActiveStep(this.flow.steps.length - 1, step);
        }

        this.unsavedChanges = true;
    }

    moveStep(from: number, to: number): void {
        const step = this.flow.steps[from];
        if (to < 0) {
            this.flow.steps.push(step);
            this.flow.steps.splice(from, 1);
        } else {
            this.flow.steps = [...this.flow.steps.slice(0, to), step, ...this.flow.steps.slice(to, this.flow.steps.length)];

            if (from < to) {
                this.flow.steps.splice(from, 1);
            } else {
                this.flow.steps.splice(from + 1, 1);
            }
        }

        this.unsavedChanges = true;
        this.nextFlow();
        this.initActiveStep();
        this.nextActiveStep();
    }

    updateStep(id: number, data: Partial<IFlowStep>): void {
        this.flow.steps = _.map(this.flow.steps, (v, i) => {
            if (i === id) {
                return _.merge(v, data);
            }

            return v;
        });

        this.unsavedChanges = true;
        this.nextFlow();
        this.setActiveStep(id, this.flow.steps[id]);
    }

    deleteStep(id: number): void {
        if (id >= 0 && id < this.flow.steps.length) {
            this.flow.steps = [...this.flow.steps.slice(0, id), ...this.flow.steps.slice(id + 1, this.flow.steps.length)];
        }

        this.initActiveStep();

        this.unsavedChanges = true;

        this.nextFlow();
        this.nextActiveStep();
    }

    saveSteps(): void {
        this.updateFlow(this.flow, { steps: this.flow.steps });

        this.unsavedChanges = false;
    }

    // addChildToStep(id: number, childType: IFlowStepType): void {
    //     if (!this.flow.steps[id].children) {
    //         this.flow.steps[id].children = [];
    //     }

    //     const step: IFlowStep = {
    //         type: childType,
    //         ticker: '',
    //         state: 'waiting',
    //     };
    //     this.flow.steps[id].children.push(step);

    //     this.unsavedChanges = true;
    // }

    /** ActiveStep */
    private nextActiveStep(): void {
        this.activeStep$.next({ activeStepId: this.activeStepId, activeStep: this.activeStep });
    }

    setActiveStep(activeStepId: number, activeStep: IFlowStep): void {
        this.activeStepId = activeStepId;
        this.activeStep = activeStep;

        this.nextActiveStep();
    }

    deleteActiveStep(): void {
        this.deleteStep(this.activeStepId);
    }
}
