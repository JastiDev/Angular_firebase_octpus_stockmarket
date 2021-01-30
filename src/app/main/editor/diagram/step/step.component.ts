import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import { FlowService } from 'app/services/flow.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'diagram-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
})
export class StepComponent {
    @Input() step: IFlowStep;

    dragCount = 0;
    constructor(public flowService: FlowService) {}

    onClickStep(event: MouseEvent): void {
        this.flowService.activeStep = this.step;
    }

    onDragStart(event: DragEvent): void {
        this.flowService.draggedItemType = this.step.type;
        const target: HTMLElement = event.target as HTMLElement;

        const icon: Element = target;

        event.dataTransfer.setDragImage(icon, 0, 0);
        event.dataTransfer.setData('dataType', 'step');
        event.dataTransfer.setData('dataValue', JSON.stringify(this.step));
    }

    onDragEnter(event: DragEvent): void {
        if (this.step.type !== 'signal' && this.flowService.draggedItemType === 'signal') this.dragCount++;
    }

    onDragLeave(event: DragEvent): void {
        if (this.step.type !== 'signal' && this.flowService.draggedItemType === 'signal') this.dragCount--;
    }

    onDragOver(event: DragEvent): void {
        if (this.step.type !== 'signal' && this.flowService.draggedItemType === 'signal') event.preventDefault();
    }

    onDrop(event: DragEvent): void {
        this.flowService.draggedItemType = null;

        event.preventDefault();
        this.flowService.activeStep = this.step;
        this.dragCount--;

        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type: IFlowStepType = JSON.parse(event.dataTransfer.getData('dataValue'));

            if (this.step.type !== 'signal' && type === 'signal') {
                this.flowService.addChild(type, this.step._id);
            }
        } else if (dataType === 'step') {
            const step = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.moveStep(stepId, this.stepId);
        }
    }
}
