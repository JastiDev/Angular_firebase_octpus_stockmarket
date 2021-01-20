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

    activeStep: IFlowStep;
    unsavedChanges = false;

    constructor(private apiService: ApiService) {}

    /** Flow */
    private nextFlow(): void {
        this.flow$.next({ flowId: this.flowId, flow: this.flow });
    }

    getFlow(): IFlow {
        return this.flow;
    }

    setFlow(flowId: string, flow: IFlow): void {
        this.flowId = flowId;
        this.flow = flow;
        this.activeStep = null;
        this.nextFlow();
    }

    updateFlow(flow: IFlow, data: Partial<IFlow>): void {
        Object.assign(flow, data);
        this.apiService.updateFlow(flow._id, data);
    }

    addStep(type: IFlowStepType, order: number): void {
        const step: IFlowStep = {
            _id: Date.now(),
            type,
            order,
            ticker: '',
            state: 'waiting',
        };

        this.flow.steps.push(step);
        this.sortStepsByOrder();

        this.activeStep = step;

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
        this.activeStep = null;
        this.nextFlow();
    }

    updateStep(id: any, data: Partial<IFlowStep>): void {
        this.flow.steps = _.map(this.flow.steps, (v, i) => {
            if (v._id === id) {
                return _.merge(v, data);
            }
            return v;
        });

        this.unsavedChanges = true;
        this.nextFlow();
    }

    deleteStep(id: any): void {
        this.flow.steps = this.flow.steps.filter((step) => step._id !== id);

        this.unsavedChanges = true;

        this.activeStep = null;
        this.sortStepsByOrder();
        this.nextFlow();
    }

    saveSteps(): void {
        this.flow.steps.forEach((step) => {
            if (typeof step._id === 'number') {
                // this number _id is generated on the frontend temporarily
                delete step._id;
            }
        });
        this.updateFlow(this.flow, { steps: this.flow.steps });

        this.unsavedChanges = false;
    }
}
