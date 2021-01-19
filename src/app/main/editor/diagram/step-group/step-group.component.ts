import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-step-group',
    templateUrl: './step-group.component.html',
    styleUrls: ['./step-group.component.scss'],
})
export class StepGroupComponent implements OnInit {
    @Input() steps: IFlowStep[];

    dragover = false;
    private isAnimating = false;

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {}

    getClass(type: IFlowStepType, hasActive: boolean): any {
        return {
            'step-buy': type === 'buy',
            'step-sell': type === 'sell',
            'step-signal': type === 'signal',
            'has-active': hasActive,
        };
    }

    onClickStep(step: IFlowStep): void {
        this.flowService.activeStep = step;
    }

    onDragEnter(event: any): void {
        if (this.isAnimating) {
            return;
        }
        const element: HTMLElement = event.target;
        if (element.classList.contains('group-container')) {
            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, 600);
            this.dragover = true;
        }
    }

    onDragLeave(event: any): void {
        if (this.isAnimating) {
            return;
        }
        const element: HTMLElement = event.target;
        if (element.classList.contains('group-container')) {
            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, 600);
            this.dragover = false;
        }
    }

    onDropChild(event): void {
        event.preventDefault();

        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type: IFlowStepType = JSON.parse(event.dataTransfer.getData('dataValue'));

            if (type === this.steps[0].type) {
                this.flowService.addStep(type, this.steps[0].order);
            }
        } else if (dataType === 'step') {
            const step = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.moveStep(stepId, this.stepId);
        }
    }

    hasActive(steps: IFlowStep[], activeStep: IFlowStep): boolean {
        return activeStep && steps.findIndex((step) => step._id === activeStep._id) > -1;
    }
}
