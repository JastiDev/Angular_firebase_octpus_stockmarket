import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import { FlowService } from 'app/services/flow.service';

@Component({
    selector: 'diagram-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
})
export class StepComponent {
    @Input() flow: IFlow;
    @Input() step: IFlowStep;
    @Input() stepId: number;

    activeExpand = false;

    constructor(public panelService: FlowService) {}

    onClickStep(event: MouseEvent): void {
        this.panelService.setActiveStep(this.stepId, this.step);
    }

    onClickChild(child: IFlowStep, id: number): void {
        this.panelService.setActiveChild(this.stepId, id, this.step);
    }

    onDragStart(event: DragEvent): void {
        const target: HTMLElement = event.target as HTMLElement;

        const icon: Element = target.querySelector('.icon-circle');

        event.dataTransfer.setDragImage(icon, 0, 0);
        event.dataTransfer.setData('dataType', 'stepId');
        event.dataTransfer.setData('dataValue', JSON.stringify(this.stepId));
    }

    onDragEnter(event: any): void {
        const element: HTMLElement = event.target;
        if (element.classList.contains('step-container')) {
            this.activeExpand = true;
        }
    }

    onDragLeave(event: any): void {
        const element: HTMLElement = event.target;
        if (element.classList.contains('step-container')) {
            this.activeExpand = false;
        }
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        this.panelService.setActiveStep(this.stepId, this.step);

        this.activeExpand = false;
        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type: IFlowStepType = JSON.parse(event.dataTransfer.getData('dataValue'));
            this.flow.addChildToStep(this.stepId, type);
        } else if (dataType === 'stepId') {
            const stepId = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.moveStep(stepId, this.stepId);
        }
    }
}
