import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as fafa from '@fortawesome/free-solid-svg-icons';
import { FlowService } from 'app/services/flow.service';
import { IFlowStepType } from 'app/shared/interfaces/IFlow';
import { STEP_TEMPLATES } from '../../../shared/data/templates';

@Component({
    selector: 'editor-steps-panel',
    templateUrl: './steps-panel.component.html',
    styleUrls: ['./steps-panel.component.scss'],
})
export class StepsPanelComponent implements OnInit {
    @Input() isMenu: boolean;
    @Output() addStep = new EventEmitter<IFlowStepType>();

    fafa = fafa;
    stepTemplates = STEP_TEMPLATES;

    constructor(private flowService: FlowService) {}
    ngOnInit(): void {}

    add(type: IFlowStepType): void {
        if (this.isMenu) {
            this.addStep.emit(type);
        }
    }

    onDragStart(event: DragEvent, type: IFlowStepType): void {
        this.flowService.draggedItemType = type;
        const target: HTMLElement = event.target as HTMLElement;

        const icon: Element = target.querySelector('.icon-circle');

        if (this.isMenu === false) {
            event.dataTransfer.setDragImage(icon, 0, 0);
            event.dataTransfer.setData('dataType', 'template');
            event.dataTransfer.setData('dataValue', JSON.stringify(type));
        }
    }
}
