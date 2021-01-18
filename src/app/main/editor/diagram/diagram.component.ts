import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as fafa from '@fortawesome/free-solid-svg-icons';
import { FlowService } from 'app/services/flow.service';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { Subscription } from 'rxjs';

@Component({
    selector: 'editor-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit, OnDestroy {
    fafa = fafa;
    flow: IFlow;
    subsFlow: Subscription;

    constructor(public flowService: FlowService) {}

    ngOnInit(): void {
        this.subsFlow = this.flowService.flow$.subscribe(({ flowId, flow }) => {
            this.flow = flow;
        });
    }
    ngOnDestroy(): void {
        this.subsFlow.unsubscribe();
    }
}
