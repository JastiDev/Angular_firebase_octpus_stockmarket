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

    constructor(private flowService: FlowService) {}

    ngOnInit(): void {}
    ngOnDestroy(): void {}

    onClickStep(event: MouseEvent): void {
        this.flowService.setActiveStep(this.step);
    }

    onClickChild(child: IFlowStep, id: number): void {
        // this.flowService.setActiveChild(this.stepId, id, this.step);
    }

    onDragStart(event: DragEvent): void {
        const target: HTMLElement = event.target as HTMLElement;

        const icon: Element = target.querySelector('.icon-circle');

        event.dataTransfer.setDragImage(icon, 0, 0);
        event.dataTransfer.setData('dataType', 'stepId');
        event.dataTransfer.setData('dataValue', JSON.stringify(this.step));
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
        this.flowService.setActiveStep(this.step);

        this.activeExpand = false;
        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type: IFlowStepType = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.addChildToStep(this.stepId, type);
        } else if (dataType === 'stepId') {
            const stepId = JSON.parse(event.dataTransfer.getData('dataValue'));
            // this.flow.moveStep(stepId, this.stepId);
        }
    }
}
