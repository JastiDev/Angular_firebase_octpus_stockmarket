import { Component, Input, OnInit } from '@angular/core';
import { IFlowStep } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'diagram-step-group',
    templateUrl: './step-group.component.html',
    styleUrls: ['./step-group.component.scss'],
})
export class StepGroupComponent implements OnInit {
    @Input() steps: IFlowStep[];

    constructor() {}

    ngOnInit() {}
}
