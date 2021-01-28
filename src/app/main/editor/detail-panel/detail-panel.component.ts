import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFlow, IFlowStep, SIGNAL_TYPES } from 'app/shared/interfaces/IFlow';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowService } from 'app/services/flow.service';

@Component({
    selector: 'editor-detail-panel',
    templateUrl: './detail-panel.component.html',
    styleUrls: ['./detail-panel.component.scss'],
})
export class DetailPanelComponent implements OnChanges {
    @Input() step: IFlowStep;
    @Input() editable: boolean;

    signalTypes = SIGNAL_TYPES;
    form?: FormGroup;

    constructor(private fb: FormBuilder, private snackbar: MatSnackBar, public flowService: FlowService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.step) {
            const step = changes.step.currentValue;

            this.form = this.fb.group({
                ...(step.type === 'signal' && step.signalType === 'wait_seconds'
                    ? {}
                    : {
                          ticker: [step.ticker],
                      }),
                ...(step.type === 'signal'
                    ? {
                          signalType: [step.signalType, Validators.required],
                          signalValue: [step.signalValue, Validators.required],
                      }
                    : {
                          amount: [step.amount, [Validators.required, Validators.pattern(/\d{1,}/), Validators.min(1), Validators.max(9999)]],
                      }),
            });
        }

        if (this.editable) this.form.enable();
        else this.form.disable();
    }

    close(): void {
        this.flowService.activeStep = null;
    }

    delete(): void {
        this.flowService.deleteStep(this.step._id);
        this.close();
    }

    save(): void {
        if (this.form.invalid) {
            this.snackbar.open('Invalid form data', 'close', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
                panelClass: ['red-snackbar'],
            });
            return;
        }

        this.flowService.updateStep(this.step._id, this.form.value);
    }
}
