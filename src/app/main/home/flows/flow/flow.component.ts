import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { FlowsService } from 'app/services/flows.service';
import { IFlow, IFlowStatus } from 'app/shared/interfaces/IFlow';
import { FlowAction } from '../flows.component';

@Component({
    selector: 'flows-flow',
    templateUrl: './flow.component.html',
    styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnChanges {
    FlowAction = FlowAction;

    @Input() flow: IFlow;
    @Output() action = new EventEmitter<FlowAction>();

    constructor(public flowsService: FlowsService, public flowService: FlowService) {}
    ngOnChanges(changes: SimpleChanges): void {}
}
