import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFlow, IFlowStep, SIGNAL_TYPES } from 'app/shared/interfaces/IFlow';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlowService } from 'app/services/flow.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'editor-detail-panel',
    templateUrl: './detail-panel.component.html',
    styleUrls: ['./detail-panel.component.scss'],
})
export class DetailPanelComponent implements OnChanges {
    @Input() step: IFlowStep;

    signalTypes = SIGNAL_TYPES;
    form?: FormGroup;

    subsFlow: Subscription;

    constructor(private fb: FormBuilder, private snackbar: MatSnackBar, public flowService: FlowService) {}
    ngOnChanges(changes: SimpleChanges): void {
        const step = changes.step.currentValue;
        if (step) {
            this.form = this.fb.group({
                ticker: [step.ticker, Validators.required],
                ...(step.type === 'signal'
                    ? {
                          signalType: [step.signalType || SIGNAL_TYPES[0], Validators.required],
                          signalValue: [step.signalValue || '', Validators.required],
                      }
                    : {
                          amount: [step.amount, [Validators.required, Validators.pattern(/\d{1,}/), Validators.min(1), Validators.max(9999)]],
                      }),
            });

            if (step.type) {
                this.form.get('signalType')?.valueChanges.subscribe(() => {
                    this.form.get('signalValue').setValue('');
                    this.form.get('signalValue').markAsPristine();
                    this.form.get('signalValue').markAsUntouched();
                });
            }
        }
    }

    close(): void {
        this.flowService.activeStep = null;
    }

    delete(): void {
        this.flowService.deleteStep(this.step._id);
        this.close();
    }

    save(): void {
        // TODO: handle error
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
        this.close();
    }
}
