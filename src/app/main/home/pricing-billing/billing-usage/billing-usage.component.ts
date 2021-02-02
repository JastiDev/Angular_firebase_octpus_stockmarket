import { Component, OnInit } from '@angular/core';
import { BillingService } from 'app/services/billing.service';

@Component({
    selector: 'app-billing-usage',
    templateUrl: './billing-usage.component.html',
    styleUrls: ['./billing-usage.component.scss'],
})
export class BillingUsageComponent implements OnInit {
    constructor(public billingService: BillingService) {}

    ngOnInit(): void {}
}
