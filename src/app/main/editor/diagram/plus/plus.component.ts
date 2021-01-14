import { Component, Input } from '@angular/core';
import { IFlowStepType } from 'app/shared/interfaces/IFlow';
import { Flow } from '../../../../shared/classes/flow';

@Component({
    selector: 'diagram-plus',
    templateUrl: './plus.component.html',
    styleUrls: ['./plus.component.scss'],
})
export class PlusComponent {
    @Input() isLast: boolean;
    @Input() stepId: number;
    @Input() flow: Flow;

    active = false;

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
        this.flow.addStep(type, this.stepId);
    }
}
