import { Injectable } from "@angular/core";
import { Flow } from "app/classes/Flow";
import { Step, StepTemplate, stepTemplates } from "app/classes/Step";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FlowsService {
    flows: Flow[] = [];
    flowsChanged = new Subject<Flow[]>();

    constructor() {}

    makeMockData() {
        this.flows = [
            new Flow("Buy racket and sell", false, [new Step(stepTemplates[0]), new Step(stepTemplates[2]), new Step(stepTemplates[1])]),
            new Flow("Buy racket and sell", false, [
                new Step(stepTemplates[0]),
                new Step(stepTemplates[2]),
                new Step(stepTemplates[2]),
                new Step(stepTemplates[2]),
                new Step(stepTemplates[1]),
            ]),
            new Flow("Sell everything", false),
            new Flow("New Strategy", false),
        ];

        this.flowsChanged.next(this.flows);
    }

    getFlow(flowId: number): Flow {
        if (flowId >= 0 && flowId < this.flows.length) return this.flows[flowId];
        return null;
    }

    toggleFlow(checked: boolean, id: number) {
        this.flows[id].isOn = checked;
        this.flowsChanged.next(this.flows);
    }

    createFlow(step0: StepTemplate, step1: StepTemplate): number {
        let flow: Flow = new Flow("New Strategy", false, [new Step(step0), new Step(step1)]);
        this.flows.push(flow);
        let id = this.flows.length - 1;
        return id;
    }

    deleteFlow(id: number) {
        this.flows.splice(id, 1);
        this.flowsChanged.next(this.flows);
    }

    renameFlow(id: number, title: string) {
        this.flows[id].title = title;
        this.flowsChanged.next(this.flows);
    }

    cloneFlow(id: number) {
        let newFlow = JSON.parse(JSON.stringify(this.flows[id]));
        this.flows = [...this.flows.slice(0, id + 1), newFlow, ...this.flows.slice(id + 1, this.flows.length)];
        this.flowsChanged.next(this.flows);
    }
}
