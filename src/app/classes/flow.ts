import { fi } from "date-fns/locale";
import { Step, StepTemplate } from "./Step";

export class Flow {
    title: string;
    isOn: boolean;
    steps: Step[];

    constructor(title: string, isOn: boolean, steps: Step[] = []) {
        this.title = title;
        this.isOn = isOn;
        this.steps = steps;
    }

    addStep(template: StepTemplate, id: number) {
        let step = new Step(template);
        console.log(step, id);
        if (id >= 0 && id < this.steps.length) {
            this.steps = [
                ...this.steps.slice(0, id),
                step,
                ...this.steps.slice(id, this.steps.length),
            ];
        } else {
            this.steps.push(step);
        }
    }

    moveStep(from: number, to: number) {
        let step = this.steps[from];
        if (to < 0) {
            this.steps.push(step);
            this.steps.splice(from, 1);
        } else {
            this.steps = [
                ...this.steps.slice(0, to),
                step,
                ...this.steps.slice(to, this.steps.length),
            ];

            if (from < to) this.steps.splice(from, 1);
            else this.steps.splice(from + 1, 1);
        }
    }

    deleteStep(id: number) {
        if (id >= 0 && id < this.steps.length) {
            this.steps = [
                ...this.steps.slice(0, id),
                ...this.steps.slice(id + 1, this.steps.length),
            ];
        }
    }
}
