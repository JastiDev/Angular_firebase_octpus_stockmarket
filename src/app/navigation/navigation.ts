import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "dashboard",
        url: "/home/dashboard",
    },
    {
        id: "flows",
        title: "Flows",
        type: "item",
        icon: "assistant",
        url: "/home/flows",
    },
];
