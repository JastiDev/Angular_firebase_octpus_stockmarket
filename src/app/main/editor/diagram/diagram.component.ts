import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FlowService } from 'app/services/flow.service';
import { IFlow } from 'app/shared/interfaces/IFlow';

@Component({
    selector: 'editor-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {
    @Input() flow: IFlow;

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {}
}
