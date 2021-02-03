import { Component, OnInit } from '@angular/core';
import { BillingService } from 'app/services/billing.service';

@Component({
    selector: 'app-billing-usage',
    templateUrl: './billing-usage.component.html',
    styleUrls: ['./billing-usage.component.scss'],
})
export class BillingUsageComponent implements OnInit {
    showCard = false;

    constructor(public billingService: BillingService) {}

    ngOnInit(): void {}

    editPaymentMethod(): void {
        this.showCard = !this.showCard;
    }
}
