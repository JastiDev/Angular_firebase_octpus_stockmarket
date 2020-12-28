import { Component, Input, OnInit } from "@angular/core";
import { Flow } from "app/classes/Flow";
import * as fafa from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: "flows-icons",
    templateUrl: "./icons.component.html",
    styleUrls: ["./icons.component.scss"],
})
export class IconsComponent implements OnInit {
    @Input() flow: Flow;

    fafa = fafa;

    constructor() {}

    ngOnInit(): void {}
}
