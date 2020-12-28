import { Component, EventEmitter, Output, OnInit, Input } from "@angular/core";

@Component({
    selector: "editor-zoom-control",
    templateUrl: "./zoom-control.component.html",
    styleUrls: ["./zoom-control.component.scss"],
})
export class ZoomControlComponent implements OnInit {
    @Input() percent: number;
    @Output() resetClicked = new EventEmitter<any>();
    @Output() plusClicked = new EventEmitter<any>();
    @Output() minusClicked = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}
}
