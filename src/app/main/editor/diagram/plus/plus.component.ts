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

    dragcnt = 0;

    constructor(private flowService: FlowService) {}

    onDragEnter(event): void {
        this.dragcnt++;
    }

    onDragLeave(event): void {
        this.dragcnt--;
    }

    onDrop(event: DragEvent): void {
        this.flowService.draggedItemType = null;
        event.preventDefault();
        this.dragcnt--;

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
