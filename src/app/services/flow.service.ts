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

    unsavedChanges = false;

    constructor(private apiService: ApiService) {}

    /** Flow */
    private nextFlow(): void {
        this.flow$.next({ flowId: this.flowId, flow: this.flow });
    }

    setFlow(flowId: string, flow: IFlow): void {
        this.flowId = flowId;
        this.flow = flow;
        this.initActiveStep();
        this.nextFlow();
    }

    updateFlow(flow: IFlow, data: Partial<IFlow>): void {
        Object.assign(flow, data);
        this.apiService.updateFlow(flow._id, data);
    }

    addStep(type: IFlowStepType, order: number): void {
        const step: IFlowStep = {
            type,
            order,
            ticker: '',
            state: 'waiting',
        };

        this.flow.steps.push(step);
        this.initActiveStep();
        this.setActiveStep(step);
        this.sortStepsByOrder();

        this.unsavedChanges = true;
        this.nextFlow();
    }

    sortStepsByOrder(): void {
        this.flow.steps.sort((x, y) => {
            if (x.order > y.order) {
                return 1;
            }
            if (x.order === y.order) {
                return 0;
            }
            return -1;
        });
        let order = 0;
        let i = 0;
        while (i < this.flow.steps.length) {
            const order0 = this.flow.steps[i].order;
            let j = i;
            while (j < this.flow.steps.length) {
                if (this.flow.steps[j].order !== order0) {
                    break;
                }
                this.flow.steps[j].order = order;
                j++;
            }
            order++;
            i = j;
        }
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
        this.initActiveStep();
        this.nextFlow();
    }

    updateStep(id: number, data: Partial<IFlowStep>): void {
        this.flow.steps = _.map(this.flow.steps, (v, i) => {
            if (i === id) {
                return _.merge(v, data);
            }
            return v;
        });

        this.sortStepsByOrder();
        this.unsavedChanges = true;
        this.nextFlow();
    }

    deleteStep(id: number): void {
        if (id >= 0 && id < this.flow.steps.length) {
            this.flow.steps = [...this.flow.steps.slice(0, id), ...this.flow.steps.slice(id + 1, this.flow.steps.length)];
        }

        this.unsavedChanges = true;

        this.initActiveStep();
        this.sortStepsByOrder();
        this.nextFlow();
    }

    saveSteps(): void {
        this.updateFlow(this.flow, { steps: this.flow.steps });

        this.unsavedChanges = false;
    }

    /** ActiveStep */

    private initActiveStep(): void {
        this.flow?.steps.forEach((step) => {
            step.active = false;
        });
    }

    setActiveStep(step: IFlowStep): void {
        this.initActiveStep();
        if (step) {
            step.active = true;
        }

        this.nextFlow();
    }

    deleteActiveStep(): void {
        const activeStepId = this.flow.steps.findIndex((step) => step.active);
        this.deleteStep(activeStepId);
    }
}
