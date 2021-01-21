import { Injectable, NgZone } from '@angular/core';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { FlowsService } from 'app/services/flows.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const MAX_CHILDREN = 12;

@Injectable({
    providedIn: 'root',
})
export class FlowService {
    private flow: IFlow;
    private flowId: string;
    flow$ = new Subject<{ flowId: string; flow: IFlow }>();

    activeStep: IFlowStep;
    unsavedChanges = false;

    constructor(private flowsService: FlowsService, public ngZone: NgZone, private snackbar: MatSnackBar) {}

    /** Flow */
    private nextFlow(): void {
        this.flow$.next({ flowId: this.flowId, flow: this.flow });
    }

    getFlow(): IFlow {
        return this.flow;
    }

    async loadFlow(flowId: string): Promise<void> {
        this.flowId = flowId;
        const flow = await this.flowsService.getFlow(flowId);
        this.flow = this.order2tree(flow);

        this.activeStep = null;
        this.nextFlow();
    }

    async saveFlow(): Promise<void> {
        const flow = this.tree2order(this.flow);
        this.flowsService.updateFlow(this.flowId, flow);

        this.unsavedChanges = false;
    }

    order2tree(_flow: IFlow): IFlow {
        const flow: IFlow = JSON.parse(JSON.stringify(_flow));

        let i = 0;
        while (i < flow.steps.length) {
            const step = flow.steps[i];
            const parentOrder = Math.ceil(step.order);
            if (parentOrder === step.order) {
                i++;
                continue;
            }
            const parent = flow.steps.find((x) => x.order === parentOrder);
            if (!parent) {
                // error fix
                step.order = parentOrder;
                i++;
            }
            if (!parent.children) parent.children = [];
            parent.children.push(step);
            flow.steps.splice(i, 1);
        }

        return flow;
    }

    tree2order(_flow: IFlow): IFlow {
        const flow: IFlow = JSON.parse(JSON.stringify(_flow));

        const steps: IFlowStep[] = [];

        let order = 1;
        flow.steps.forEach((step) => {
            if (!step.children || step.children.length === 0) {
                step.order = order;
                steps.push(step);
            } else {
                step.children.forEach((child) => {
                    child.order = order - 0.5;
                    steps.push(child);
                });
                step.order = order;
                steps.push(step);
            }
            order++;
        });

        steps.forEach((step) => {
            if (typeof step._id === 'number') delete step._id; // this number _id is generated on the frontend temporarily
            if (step.children) delete step.children;
        });

        flow.steps = steps;
        console.log(flow.steps);

        return flow;
    }

    updateFlow(flow: IFlow, data: Partial<IFlow>): void {
        Object.assign(flow, data);
        this.unsavedChanges = true;
        this.nextFlow();
    }

    addStep(type: IFlowStepType, position: number): void {
        const step: IFlowStep = {
            _id: Date.now(),
            type,
            ticker: '',
            state: 'waiting',
            children: [],
        };
        const steps = this.flow.steps;
        if (position === -1) this.flow.steps.push(step);
        else if (position < steps.length && position > -1)
            this.flow.steps = [...steps.slice(0, position), step, ...steps.slice(position, steps.length)];

        this.activeStep = step;
        this.unsavedChanges = true;
        this.nextFlow();
    }

    addChild(type: IFlowStepType, parentId: string): void {
        const step: IFlowStep = {
            _id: Date.now(),
            type,
            ticker: '',
            state: 'waiting',
        };

        if (!parentId) {
            this.flow.steps.push(step);
        } else {
            const parent = this.flow.steps.find((x) => x._id === parentId);
            if (!parent) return;
            if (!parent.children) parent.children = [];
            if (parent.children.length === MAX_CHILDREN) {
                this.ngZone.run(() => {
                    this.snackbar.open('Can not add more than 12 children', 'close', {
                        horizontalPosition: 'end',
                        verticalPosition: 'top',
                        duration: 5000,
                        panelClass: ['red-snackbar'],
                    });
                });
                return;
            }
            parent.children.push(step);
        }

        this.activeStep = step;
        this.unsavedChanges = true;
        this.nextFlow();
    }

    // moveStep(from: number, to: number): void {
    //     const step = this.flow.steps[from];
    //     if (to < 0) {
    //         this.flow.steps.push(step);
    //         this.flow.steps.splice(from, 1);
    //     } else {
    //         this.flow.steps = [...this.flow.steps.slice(0, to), step, ...this.flow.steps.slice(to, this.flow.steps.length)];

    //         if (from < to) {
    //             this.flow.steps.splice(from, 1);
    //         } else {
    //             this.flow.steps.splice(from + 1, 1);
    //         }
    //     }

    //     this.unsavedChanges = true;
    //     this.activeStep = null;
    //     this.nextFlow();
    // }

    updateStep(id: any, data: Partial<IFlowStep>): void {
        this.flow.steps = _.map(this.flow.steps, (v, i) => {
            if (v._id === id) {
                return _.merge(v, data);
            } else if (v.children) {
                const child = v.children.find((x) => x._id === id);
                _.merge(child, data);
            }
            return v;
        });

        this.unsavedChanges = true;
        this.nextFlow();
    }

    deleteStep(id: any): void {
        this.flow.steps.forEach((step) => {
            if (step.children) step.children = step.children.filter((x) => x._id !== id);
        });
        this.flow.steps = this.flow.steps.filter((step) => step._id !== id);

        this.activeStep = null;
        this.unsavedChanges = true;
        this.nextFlow();
    }
}
