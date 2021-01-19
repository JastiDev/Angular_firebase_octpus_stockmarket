import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-step-group',
    templateUrl: './step-group.component.html',
    styleUrls: ['./step-group.component.scss'],
})
export class StepGroupComponent implements OnInit, OnChanges {
    @Input() steps: IFlowStep[];

    hasActive = false;

    constructor(private flowService: FlowService) {}

    ngOnChanges(changes: SimpleChanges): void {
        const steps: IFlowStep[] = changes.steps.currentValue;
        this.hasActive = steps.findIndex((step) => step.active) > -1;
    }

    ngOnInit(): void {
        console.log('ngOnInit');
    }

    getClass(type: IFlowStepType, hasActive: boolean): any {
        return {
            'step-buy': type === 'buy',
            'step-sell': type === 'sell',
            'step-signal': type === 'signal',
            'has-active': hasActive,
        };
    }

    onClickStep(step: IFlowStep): void {
        this.flowService.setActiveStep(step);
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
}
