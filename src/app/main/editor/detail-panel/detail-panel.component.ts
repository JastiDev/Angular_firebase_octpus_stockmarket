import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFlowStep } from 'app/shared/interfaces/IFlow';
import { Flow } from '../../../shared/classes/flow';

@Component({
    selector: 'editor-detail-panel',
    templateUrl: './detail-panel.component.html',
    styleUrls: ['./detail-panel.component.scss'],
})
export class DetailPanelComponent implements OnChanges {
    form?: FormGroup
    step?: IFlowStep

    @Input() flow: Flow;
    @Input() activeStepId: number;
    @Output() setActiveStepId = new EventEmitter<number>();
    @Output() deleteClicked = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder
    ){}

    ngOnChanges(changes): void {
        if(changes.activeStepId){
            const {currentValue} = changes.activeStepId

            if(currentValue < 0){
                return
            }

            this.step = this.flow.steps[currentValue]

            this.form = this.fb.group({
                ticker: [this.step.ticker, Validators.required],
                ...this.step.type === 'signal'
                ? { waitFor: [this.step.waitFor, Validators.required] }
                : { amount: [this.step.amount, [Validators.required, Validators.pattern(/\d{1,}/), Validators.min(1), Validators.max(9999)]] }
            })
        }
    }

    close(): void {
        this.setActiveStepId.emit(-1);
    }

    delete(): void {
        this.flow.deleteStep(this.activeStepId)
        this.close()
    }

    save(): void {
        // TODO: handle error
        if(this.form.invalid){
            return
        }

        this.flow.updateStep(this.activeStepId, this.form.value)
        this.close()
    }
}
