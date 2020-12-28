import * as fafa from "@fortawesome/free-solid-svg-icons";

export class Step {
    template: StepTemplate;
    title: string;

    constructor(template: StepTemplate) {
        this.template = template;
        this.title = template.title;
    }
}

export class StepTemplate {
    faIcon: any;
    color: string;
    title: string;
    description: string;
}

export const stepTemplates: StepTemplate[] = [
    {
        faIcon: fafa.faShoppingBasket,
        color: "orange",
        title: "Buy",
        description:
            "This step adds a note to a conversation. Notes can be seen directly on Inbox, Conversations, and available via API, but aren't visible to the recipient of the conversation.",
    },
    {
        faIcon: fafa.faMoneyBill,
        color: "green",
        title: "Sell",
        description:
            "This step adds a note to a conversation. Notes can be seen directly on Inbox, Conversations, and available via API, but aren't visible to the recipient of the conversation.",
    },
    {
        faIcon: fafa.faMapSigns,
        color: "blue",
        title: "Signal",
        description:
            "This step adds a note to a conversation. Notes can be seen directly on Inbox, Conversations, and available via API, but aren't visible to the recipient of the conversation.",
    },
];
