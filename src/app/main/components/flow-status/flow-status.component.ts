import { Component, Input } from '@angular/core';
import { IFlowStatus } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'main-flow-status',
    templateUrl: './flow-status.component.html',
    styleUrls: ['./flow-status.component.scss'],
})
export class FlowStatusComponent {
    @Input() status: IFlowStatus;
    constructor() {}
}
