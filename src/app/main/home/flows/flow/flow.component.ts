import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlowAction } from '../flows.component';
import { Flow } from '../../../../shared/classes/flow';

@Component({
    selector: 'flows-flow',
    templateUrl: './flow.component.html',
    styleUrls: ['./flow.component.scss'],
})
export class FlowComponent {
    FlowAction = FlowAction

    @Input() flow: Flow;
    @Output() action = new EventEmitter<FlowAction>();
}
