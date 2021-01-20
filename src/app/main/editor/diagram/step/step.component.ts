import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import { FlowService } from 'app/services/flow.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'diagram-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit, OnDestroy {
    @Input() step: IFlowStep;

    activeExpand = false;
    constructor(public flowService: FlowService) {}

    ngOnInit(): void {}
    ngOnDestroy(): void {}

    onClickStep(event: MouseEvent): void {
        this.flowService.activeStep = this.step;
    }

    onDragStart(event: DragEvent): void {
        const target: HTMLElement = event.target as HTMLElement;

        const icon: Element = target;

        event.dataTransfer.setDragImage(icon, 0, 0);
        event.dataTransfer.setData('dataType', 'step');
        event.dataTransfer.setData('dataValue', JSON.stringify(this.step));
    }

    onDragEnter(event: any): void {
        const element: HTMLElement = event.target;

        this.activeExpand = true;
    }

    onDragLeave(event: any): void {
        const element: HTMLElement = event.target;
        if (element.classList.contains('step-container')) {
            this.activeExpand = false;
            console.log('! expand');
        }
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.flowService.activeStep = this.step;

        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type: IFlowStepType = JSON.parse(event.dataTransfer.getData('dataValue'));

            if (type === this.step.type) {
                this.flowService.addStep(type, this.step.order);
            }
        } else if (dataType === 'step') {
            const step = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.moveStep(stepId, this.stepId);
        }
    }
}
