import { Injectable } from "@angular/core";
import { Flow } from "app/classes/flow";
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
            {
                title: "Name your flow",
                isOn: true,
                items: [],
            },
            {
                title: "Name your flow",
                isOn: false,
                items: [],
            },
            {
                title: "Name your flow",
                isOn: false,
                items: [],
            },
        ];

        this.flowsChanged.next(this.flows);
    }

    getFlow(flowId: number): Flow {
        if (flowId >= 0 && flowId < this.flows.length)
            return this.flows[flowId];
        return null;
    }

    toggleFlow(checked: boolean, id: number) {
        this.flows[id].isOn = checked;
        this.flowsChanged.next(this.flows);
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
        this.flows = [
            ...this.flows.slice(0, id + 1),
            newFlow,
            ...this.flows.slice(id + 1, this.flows.length),
        ];
        this.flowsChanged.next(this.flows);
    }
}
