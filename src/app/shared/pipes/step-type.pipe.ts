import { Pipe, PipeTransform } from '@angular/core';
import { IFlowStepType } from 'app/shared/interfaces/IFlow';
import { STEP_TEMPLATES } from '../data/templates';
import * as _ from 'lodash'

@Pipe({
  name: 'stepType'
})
export class StepTypePipe implements PipeTransform {

  transform(type: IFlowStepType, field = 'title'): any {
    const step = _.find(STEP_TEMPLATES, {type})

    return step[field]
  }

}
