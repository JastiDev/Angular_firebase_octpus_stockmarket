import { ApiService } from 'app/services/api.service';
import { IFlow, IFlowStep, IFlowStepType } from 'app/shared/interfaces/IFlow';
import * as _ from 'lodash'

export class Flow {
  _id: string
  title: string
  status: string
  steps: IFlowStep[]

  unsavedChanges = false

  constructor(
    rawFlow: IFlow,
    private apiService: ApiService
  ) {
    Object.assign(this, rawFlow)
  }

  update(data: Partial<IFlow>): void{
    Object.assign(this, data)
    
    this.apiService.updateFlow(this._id, data)
  }

  addStep(type: IFlowStepType, id: number): void {
    const step: IFlowStep = {
      type,
      ticker: '',
      state: 'waiting'
    }

    if (id >= 0 && id < this.steps.length) {
      this.steps = [...this.steps.slice(0, id), step, ...this.steps.slice(id, this.steps.length)];
    } else {
      this.steps.push(step);
    }

    this.unsavedChanges = true
  }

  moveStep(from: number, to: number): void {
    const step = this.steps[from];
    if (to < 0) {
      this.steps.push(step);
      this.steps.splice(from, 1);
    } else {
      this.steps = [...this.steps.slice(0, to), step, ...this.steps.slice(to, this.steps.length)];

      if (from < to) { this.steps.splice(from, 1); }
      else { this.steps.splice(from + 1, 1); }
    }

    this.unsavedChanges = true
  }

  updateStep(id: number, data: Partial<IFlowStep>): void{
    this.steps = _.map(this.steps, (v, i) => {
      if(i === id){
        return _.merge(v, data)
      }

      return v
    })

    this.unsavedChanges = true
  }

  deleteStep(id: number): void {
    if (id >= 0 && id < this.steps.length) {
      this.steps = [...this.steps.slice(0, id), ...this.steps.slice(id + 1, this.steps.length)];
    }

    this.unsavedChanges = true
  }

  saveSteps(): void{
    this.update({steps: this.steps})

    this.unsavedChanges = false
  }

  toJSON(): string{
    return JSON.stringify(_.pick(this, ['_id', 'title', 'status', 'steps']))
  }
  
  addChildToStep(id:number, childType: IFlowStepType): void { 
    if (!this.steps[id].children) this.steps[id].children = [];

    const step: IFlowStep = {
      type: childType,
      ticker: '',
      state: 'waiting'
    }
    this.steps[id].children.push(step)
    
    this.unsavedChanges = true
  }

}
