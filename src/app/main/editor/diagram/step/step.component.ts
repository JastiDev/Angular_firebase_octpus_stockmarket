import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlowStep } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
})
export class StepComponent {
    @Input() step: IFlowStep;
    @Input() stepId: number;
    @Input() active: boolean;
    @Output() stepClicked = new EventEmitter<any>();

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
}
