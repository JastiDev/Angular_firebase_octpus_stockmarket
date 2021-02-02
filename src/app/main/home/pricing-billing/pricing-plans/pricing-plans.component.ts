import { Component, OnInit } from '@angular/core';
import { BillingService } from 'app/services/billing.service';

@Component({
    selector: 'main-pricing-plans',
    templateUrl: './pricing-plans.component.html',
    styleUrls: ['./pricing-plans.component.scss'],
})
export class PricingPlansComponent implements OnInit {
    constructor(public billingService: BillingService) {}

    ngOnInit(): void {}

    select(): void {}

    isInt(x: number): boolean {
        return x === Math.floor(x);
    }
}
