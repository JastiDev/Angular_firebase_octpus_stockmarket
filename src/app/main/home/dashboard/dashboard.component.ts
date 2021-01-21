import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlowsService } from 'app/services/flows.service';
import * as fafa from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    fafa = fafa;

    public cards = [
        {
            title: 'Collaborate',
            icon: 'faPeopleCarry',
            color: 'rgb(102, 102, 102)',
            usedBy: '93k',
            flowJSON: `{"title": "Popular Strategy","status": "active","steps": []}`,
        },
        {
            title: 'Buy Signal Sell',
            icon: 'faShoppingBasket',
            color: 'rgb(229, 176, 56)',
            usedBy: '6.3k',
            flowJSON: `{"title": "Popular Strategy","status": "active","steps": []}`,
        },
        {
            title: 'Increase',
            icon: 'faSignal',
            color: 'rgb(252, 28, 116)',
            usedBy: '3k',
            flowJSON: `{"title": "Popular Strategy","status": "active","steps": []}`,
        },
        {
            title: 'Short term commit',
            icon: 'faCheck',
            color: 'rgb(63, 182, 215)',
            usedBy: '21k',
            flowJSON: `{"title": "Popular Strategy","status": "active","steps": []}`,
        },
    ];

    constructor(private flowsService: FlowsService, private router: Router) {}

    async select(flowJSON: string): Promise<void> {
        const { _id } = await this.flowsService.createFlow(JSON.parse(flowJSON));

        this.router.navigate(['/editor', _id]);
    }
}
