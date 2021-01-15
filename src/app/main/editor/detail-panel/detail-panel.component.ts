import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFlowStep, SIGNAL_TYPES } from 'app/shared/interfaces/IFlow';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Flow } from '../../../shared/classes/flow';

@Component({
    selector: 'editor-detail-panel',
    templateUrl: './detail-panel.component.html',
    styleUrls: ['./detail-panel.component.scss'],
})
export class DetailPanelComponent implements OnChanges {
    signalTypes = SIGNAL_TYPES

    form?: FormGroup
    step?: IFlowStep

    @Input() flow: Flow;
    @Input() activeStepId: number;
    @Output() setActiveStepId = new EventEmitter<number>();
    @Output() deleteClicked = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder,
        private snackbar: MatSnackBar
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
                ? {
                    signalType: [this.step.signalType || SIGNAL_TYPES[0], Validators.required],
                    signalValue: [this.step.signalValue || '', Validators.required]
                }
                : { amount: [this.step.amount, [Validators.required, Validators.pattern(/\d{1,}/), Validators.min(1), Validators.max(9999)]] }
            })

            if(this.step.type){
                this.form.get('signalType').valueChanges.subscribe(() => {
                    this.form.get('signalValue').setValue('')
                    this.form.get('signalValue').markAsPristine()
                    this.form.get('signalValue').markAsUntouched()
                })
            }

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
        if (this.form.invalid) {
            this.snackbar.open('Invalid form data', 'close', { horizontalPosition: 'end', verticalPosition: 'top', duration: 3000, panelClass: ['red-snackbar'] });
            return
        }

        this.flow.updateStep(this.activeStepId, this.form.value)
        this.close()
    }
}
