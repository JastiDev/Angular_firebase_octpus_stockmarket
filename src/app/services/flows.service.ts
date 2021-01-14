import { Injectable } from '@angular/core';
import { IFlow } from 'app/shared/interfaces/IFlow';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import * as _ from 'lodash'
import { Flow } from '../shared/classes/flow';

@Injectable({
    providedIn: 'root',
})
export class FlowsService {
    flows: Flow[];
    flows$ = new Subject<Flow[]>();

    constructor(
        private apiService: ApiService
    ) {}

    private next(data?: Flow | Flow[]): void{
        if(data){
            if(Array.isArray(data)){
                this.flows = data
            }else{
                this.flows = (this.flows || []).concat(data)
            }
        }

        this.flows$.next(this.flows)
    }

    async fetchFlows(): Promise<void>{
        const rawFlows = await this.apiService.getFlows()
        
        this.next(rawFlows.map(v => new Flow(v, this.apiService)))
    }

    async createFlow(data: IFlow): Promise<Flow>{
        const rawFlow = await this.apiService.createFlow(data)
        const flow = new Flow(rawFlow, this.apiService)

        this.next(flow)

        return flow
    }

    async updateFlow(_id: string, data: Partial<IFlow>): Promise<Flow> {
        const updatedFlow = new Flow(
            await this.apiService.updateFlow(_id, data),
            this.apiService
        )

        this.next(this.flows.map(f => f._id === _id ? f : updatedFlow))

        return updatedFlow
    }

    async deleteFlow(_id: string): Promise<void> {
        await this.apiService.deleteFlow(_id)

        this.next(this.flows.filter(f => f._id !== _id))
    }

    async getFlow(_id: string): Promise<Flow> {
        const localFlow = _.find(this.flows, {_id})

        if(localFlow){
            return Promise.resolve(localFlow)
        }

        const flow = new Flow(
            await this.apiService.getFlow(_id),
            this.apiService
        )

        this.next(flow)

        return flow
    }
}
