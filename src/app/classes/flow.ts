import { FlowItem } from "./flow-item";

export class Flow {
    title: string;
    isOn: boolean;
    items: FlowItem[];

    constructor(title: string, isOn: boolean, items: FlowItem[] = []) {
        this.title = title;
        this.isOn = isOn;
        this.items = items;
    }
}
