import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
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
export class DetailPanelComponent implements OnInit, OnDestroy {
    signalTypes = SIGNAL_TYPES;

    form?: FormGroup;

    flow: IFlow;
    flowId: string;

    step: IFlowStep;
    stepId: number;

    subsFlow: Subscription;
    subsStep: Subscription;

    constructor(private fb: FormBuilder, private snackbar: MatSnackBar, public flowService: FlowService) {}

    ngOnInit(): void {
        this.subsFlow = this.flowService.flow$.subscribe(({ flowId, flow }) => {
            this.flow = flow;
            this.flowId = flowId;

            this.stepId = this.flow.steps.findIndex((step) => step.active);
            if (this.stepId === -1) {
                this.step = null;
            } else {
                this.step = this.flow.steps[this.stepId];
                this.form = this.fb.group({
                    ticker: [this.step.ticker, Validators.required],
                    ...(this.step.type === 'signal'
                        ? {
                              signalType: [this.step.signalType || SIGNAL_TYPES[0], Validators.required],
                              signalValue: [this.step.signalValue || '', Validators.required],
                          }
                        : {
                              amount: [
                                  this.step.amount,
                                  [Validators.required, Validators.pattern(/\d{1,}/), Validators.min(1), Validators.max(9999)],
                              ],
                          }),
                });

                if (this.step.type) {
                    this.form.get('signalType')?.valueChanges.subscribe(() => {
                        this.form.get('signalValue').setValue('');
                        this.form.get('signalValue').markAsPristine();
                        this.form.get('signalValue').markAsUntouched();
                    });
                }
            }
        });
    }

    ngOnDestroy(): void {
        this.subsFlow.unsubscribe();
        this.subsStep.unsubscribe();
    }

    close(): void {
        this.flowService.setActiveStep(null);
    }

    delete(): void {
        this.flowService.deleteActiveStep();
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

        this.flowService.updateStep(this.stepId, this.form.value);
        this.close();
    }
}
