import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flow } from 'app/shared/classes/flow';
import { IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
})
export class StepComponent {
    @Input() flow: Flow;
    @Input() step: IFlowStep;
    @Input() stepId: number;
    @Input() activeStepId: number;
    @Output() stepClicked = new EventEmitter<any>();

    activeExpand = false;

    onClickStep(): void {
        this.stepClicked.emit();
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
        this.stepClicked.emit();
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
