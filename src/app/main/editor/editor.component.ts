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

    easypz;

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
                this.flow = new Flow("New Strategy", false);
                console.log(this.mode);
            }
        });

        this.makeEasyPZ();
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

    translateX = -7500;
    translateY = -7500;
    scale = 1;

    initTransform() {
        this.translateX = -7500;
        this.translateY = -7500;
        this.scale = 1;
    }

    transformString(scale, translateX, translateY) {
        return `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
    }

    makeEasyPZ() {
        this.initTransform();
        if (this.easypz) this.easypz.removeHostListeners();

        const onTransform = (transform: { scale: number; translateX: number; translateY: number }) => {};

        const onPanned = (
            panData: { x: number; y: number },
            transform: {
                scale: number;
                translateX: number;
                translateY: number;
            }
        ) => {
            this.translateX += panData.x;
            this.translateY += panData.y;
        };

        const onZoomed = (
            zoomData: {
                x: number;
                y: number;
                scaleChange?: number;
                absoluteScaleChange?: number;
                targetX?: number;
                targetY?: number;
            },
            transform: {
                scale: number;
                translateX: number;
                translateY: number;
            }
        ) => {
            let scale = this.scale * zoomData.scaleChange;
            if (scale > 1.75) scale = 1.75;
            if (scale < 0.25) scale = 0.25;
            this.scale = scale;
        };

        let container: HTMLElement = document.querySelector("#pan-container");

        this.easypz = new EasyPZ(
            container,
            onTransform,
            {
                minScale: 0.25,
                maxScale: 1.75,
                bounds: {
                    top: -15000,
                    right: 15000,
                    bottom: 15000,
                    left: -15000,
                },
            },
            ["SIMPLE_PAN", "WHEEL_ZOOM", "PINCH_ZOOM"],
            { WHEEL_ZOOM: { zoomInScaleChange: 0.98, zoomOutScaleChange: 1.02 } },
            onPanned,
            onZoomed
        );
    }

    zoomPlus() {
        let scale = this.scale + 0.25;
        if (scale > 1.75) scale = 1.75;
        this.scale = scale;
    }

    zoomMinus() {
        let scale = this.scale - 0.25;
        if (scale < 0.25) scale = 0.25;
        this.scale = scale;
    }

    zoomRest() {
        this.makeEasyPZ();
    }
}
