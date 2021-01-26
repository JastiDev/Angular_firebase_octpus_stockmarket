import { Component, Input } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { IFlowStepType } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-plus',
    templateUrl: './plus.component.html',
    styleUrls: ['./plus.component.scss'],
})
export class PlusComponent {
    @Input() position: number;

    active = false;

    constructor(private flowService: FlowService) {}

    onDragEnter(event): void {
        const element: HTMLElement = event.target;
        if (element.id === 'droptarget') {
            this.active = true;
        }
    }

    onDragLeave(event): void {
        const element: HTMLElement = event.target;
        if (element.id === 'droptarget') {
            this.active = false;
        }
    }

    onDrop(event: DragEvent): void {
        this.flowService.draggedItemType = null;
        event.preventDefault();
        this.active = false;

        const dataType = event.dataTransfer.getData('dataType');
        if (dataType === 'template') {
            const type = JSON.parse(event.dataTransfer.getData('dataValue'));
            this.addStep(type);
        } else if (dataType === 'stepId') {
            const stepId = JSON.parse(event.dataTransfer.getData('dataValue'));

            // this.flow.moveStep(stepId, this.stepId);
        }
    }

    addStep(type: IFlowStepType): void {
        this.flowService.addStep(type, this.position);
    }
}
