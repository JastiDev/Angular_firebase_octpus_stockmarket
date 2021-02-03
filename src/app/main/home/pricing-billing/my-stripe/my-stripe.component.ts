import { Component, OnInit } from '@angular/core';
import { BillingService } from 'app/services/billing.service';

@Component({
    selector: 'main-my-stripe',
    templateUrl: './my-stripe.component.html',
    styleUrls: ['./my-stripe.component.scss'],
})
export class MyStripeComponent implements OnInit {
    cardCaptureReady = false;
    invalidError: any;
    cardDetailsFilledOut: any;
    extraData: any;

    constructor(public billingService: BillingService) {}

    ngOnInit() {}

    onStripeInvalid(error: Error) {
        console.log('Validation Error', error);
    }

    onStripeError(error: Error) {
        console.error('Stripe error', error);
    }

    setPaymentMethod(token: stripe.paymentMethod.PaymentMethod) {
        console.log('Stripe Payment Method', token);
    }

    setStripeToken(token: stripe.Token) {
        console.log('Stripe Token', token);
    }

    setStripeSource(source: stripe.Source) {
        console.log('Stripe Source', source);
    }
}
