import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as fafa from '@fortawesome/free-solid-svg-icons';
import { Flow } from '../../../shared/classes/flow';

@Component({
    selector: 'editor-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent {
    @Input() flow: Flow;
    @Input() activeStepId: number;
    @Output() setActiveStepId = new EventEmitter<number>();
    fafa = fafa;

    handleClickStep(id: number): void {
        // if (this.activeStepId === id) { this.setActiveStepId.next(-1); }
        // else 
        this.setActiveStepId.next(id);        
    }
}
