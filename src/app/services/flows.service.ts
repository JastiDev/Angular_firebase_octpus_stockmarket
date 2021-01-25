import { Injectable, NgZone } from '@angular/core';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class FlowsService {
    flows: IFlow[];
    flows$ = new Subject<IFlow[]>();

    constructor(private apiService: ApiService, public ngZone: NgZone, private router: Router, private snackbar: MatSnackBar) {}

    private next(data?: IFlow | IFlow[]): void {
        if (data) {
            if (Array.isArray(data)) {
                this.flows = data;
            } else {
                this.flows = (this.flows || []).concat(data);
            }
        }

        this.flows$.next(this.flows);
    }

    async fetchFlows(): Promise<void> {
        const flows = await this.apiService.getFlows();
        this.next(flows);
    }

    async createFlow(data: IFlow): Promise<IFlow> {
        const flow = await this.apiService.createFlow(data);
        this.next(flow);

        return flow;
    }

    async updateFlow(_id: string, data: Partial<IFlow>): Promise<IFlow> {
        const updatedFlow: IFlow = await this.apiService.updateFlow(_id, data);

        this.next(this.flows.map((f) => (f._id === _id ? updatedFlow : f)));

        return updatedFlow;
    }

    async deleteFlow(_id: string): Promise<void> {
        await this.apiService.deleteFlow(_id);

        this.next(this.flows.filter((f) => f._id !== _id));
    }

    async getFlow(_id: string): Promise<IFlow> {
        const localFlow = _.find(this.flows, { _id });

        if (localFlow) {
            return Promise.resolve(localFlow);
        }

        const flow = await this.apiService.getFlow(_id);

        if (!flow) {
            this.ngZone.run(() => {
                this.snackbar.open('Strategy not found with id: ' + _id, 'close', {
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 5000,
                    panelClass: ['red-snackbar'],
                });
                this.router.navigate(['/home/strategies']);
            });

            return;
        }

        this.next(flow);

        return flow;
    }
}
