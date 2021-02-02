import { Component, OnInit } from '@angular/core';
import { ChartService } from 'app/services/chart.service';

import { lineChartData } from 'app/services/charts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    chartDataConfig: ChartService;

    lineChartData = lineChartData;

    constructor(private chartService: ChartService) {
        this.chartDataConfig = this.chartService;
    }

    ngOnInit(): void {}
}
