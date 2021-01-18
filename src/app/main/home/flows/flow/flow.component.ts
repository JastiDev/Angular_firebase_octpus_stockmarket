import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { FlowAction } from '../flows.component';

@Component({
    selector: 'flows-flow',
    templateUrl: './flow.component.html',
    styleUrls: ['./flow.component.scss'],
})
export class FlowComponent {
    FlowAction = FlowAction;

    @Input() flow: IFlow;
    @Output() action = new EventEmitter<FlowAction>();

    constructor(public flowService: FlowService) {}
}
