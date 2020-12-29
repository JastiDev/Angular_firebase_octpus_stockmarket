import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "makeflow",
        title: "MAKE A FLOW",
        type: "item",
        icon: "add",
        url: "/editor",
    },
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
    {
        id: "myapps",
        title: "My Apps",
        type: "item",
        icon: "apps",
        url: "/home/myapps",
    },
];
