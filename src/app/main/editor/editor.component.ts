import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { FuseConfigService } from "@fuse/services/config.service";
import { Flow } from "app/classes/Flow";
import { FlowsService } from "app/services/flows.service";
import { Step } from "app/classes/Step";

declare const EasyPZ;

@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
    flow: Flow;

    mode = "create";
    flowId: number;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private activatedRoute: ActivatedRoute,
        private flowsService: FlowsService,
        private location: Location
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("flowId")) {
                this.mode = "edit";
                this.flowId = Number(paramMap.get("flowId"));
                this.flow = this.flowsService.getFlow(this.flowId);
                console.log(this.mode);
            } else {
                this.mode = "create";
                this.flowId = null;
                this.flow = new Flow("new flow", false);
                console.log(this.mode);
            }
        });

        let container: HTMLElement = document.querySelector("#pan-container");
        let panel: HTMLElement = document.querySelector("#pan-panel");
        new EasyPZ(
            container,
            function (transform) {
                panel.style.transform = `scale(${transform.scale}) translate(${
                    transform.translateX - 7500 / transform.scale
                }px, ${transform.translateY - 7500 / transform.scale}px)`;
            },
            {
                minScale: 0.8,
                maxScale: 1.5,
                bounds: {
                    top: -15000,
                    right: 15000,
                    bottom: 15000,
                    left: -15000,
                },
            },
            ["SIMPLE_PAN", "WHEEL_ZOOM", "PINCH_ZOOM"]
        );
    }

    goBack() {
        this.location.back();
    }

    activeStepId: number = -1;
    setActiveStepId(id: number) {
        this.activeStepId = id;
    }

    onClickPanContainer(event) {
        if (event.target.id.slice(0, 3) === "pan") this.setActiveStepId(-1);
    }

    deleteActiveStep() {
        this.flow.deleteStep(this.activeStepId);
        this.setActiveStepId(-1);
    }
}
